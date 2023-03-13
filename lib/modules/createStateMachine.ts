import type { ChildrenState, FormatterOptions, Operands, Operators, ResultObj } from "../types"
import { ListFormatterBuilder } from "./ListFormatterBuilder"

type ForStates<States extends string, TagIds extends string> = [TagIds, States, Omit<FormatterOptions, 'elmType'>][];
type StateTransitions<States extends string> = Array<{
    from: States,
    to: States,
    when: {
        operator: Operators,
        operands: Operands
    }
}>;
type MapValue<States extends string> = {
    states: States[number][],
    currentCustomization: Omit<FormatterOptions, 'elmType'>,
    transitions: StateTransitions<States[number]>
};

function createStateMachine<States extends string, TagIds extends string>(
    builderInstance: ListFormatterBuilder | ChildrenState,
    events: {
        for: ForStates<TagIds, States>,
        transitions: StateTransitions<States>
    }
) {
    const uniqueIds = [...new Set(events.for.map(([_, tagId]) => tagId))];
    const stateEventMap = new Map<TagIds, MapValue<States>>([]);
    //Add information to the map
    for (const id of uniqueIds) {
        stateEventMap.set(id, {
            states: [],
            currentCustomization: {},
            transitions: []
        });
    }
    //Add states and transitions to the map
    for (const [state, tagId, customization] of events.for) {
        if(stateEventMap.has(tagId)) {
            const mapValue = stateEventMap.get(tagId)!;
            mapValue.states = [...mapValue?.states, state].filter(Boolean)
            mapValue.currentCustomization = customization;
            mapValue.transitions = events.transitions.filter(t => t?.from === state);
        }
    }

    for (const [tagId, data] of [...stateEventMap]) {
        const resultObj = (builderInstance as ListFormatterBuilder).findNodeById<{elmType: 'clone', states: ResultObj[]}>(tagId, (foundItem => {
            if(!foundItem) return;
            const originalItem = { ...foundItem } as unknown as ResultObj;
            console.log(data);
            foundItem = {
                elmType: 'clone',
                states: data.states.map(state => {

                    return {
                        ...originalItem,
                        style: {
                            ...originalItem?.style,
                            display: '' //Find the transition to thsi state, and take the expression from `when` and apply to the display
                        }
                    }
                })
            }
        }));
        if(!resultObj) {
            console.error(`No element with id ${tagId} found, states will not be applied to this element.`);
            continue;
        }
        console.log(resultObj, data);
    }
}

const builder = ListFormatterBuilder.init('div').addElement({elmType: 'button'});

createStateMachine<"A" | "D", "div1">(builder, {
    for: [
        ["A", "div1", {attributes: {class: "foo"}}], //For state "A" on element with id "div1" add a attribute with class "foo"
        ["D", "div1", {attributes: {class: "bar"}}] //For state "D" on element with id "div1" add a attribute with class "bar"
    ],
    transitions: [
        //When the current state is "A" and the current field is "x" then change the state to "D"
        {
            from: "A",
            to: "D",
            when: {
                operator: "==",
                operands: ["@currentField", "x"]
            }
        }
    ]
});
builder.build();