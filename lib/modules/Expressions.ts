import type { Operators, Operands, FormatterOptions } from '../types';

type Condition = `${string} ${Operators} ${string}`;
export class Expressions {
    static If(
        condition: Condition,
        trueValue: string,
        falseValue: string,
        removeEq = false
    ): string {
        return `=if(${condition}, ${trueValue}, ${falseValue}`.replace('=', removeEq ? '' : '=');
    }
}

export const FIELD_HELPERS = {
    CURRENT_FIELD: "@currentField",
    ME: "@me",
    FIELD: (name: string) => `\$[${name}]` as const,
    CURRENT_WEB: "@currentWeb",
    NOW: "@now",
    ROW_IDX: "@rowIndex",
    WIN_HEIGHT: "@window.innerHeight",
    WIN_WIDTH: "@window.innerWidth",
    THUMBNAILS: {
        SMALL: "@thumbnails.small",
        MEDIUM: "@thumbnails.medium",
        LARGE: "@thumbnails.large",
        SIZE: (size: number) => `@thumbnails.${size}` as const,
        SIZE_WH: (width: number, height: number) => `@thumbnails.${width}x${height}` as const
    },
    IS_SELECTED: "@isSelected",
    LCID: "@lcid",
    UILCID: "@UIlcid"
} as const;

function createStateMachine<States extends string, TagIds extends string>(
    events: {
        for: [States, TagIds, FormatterOptions][],
        transitions: Array<{
            from: States,
            to: States,
            when: {
                operator: Operators,
                operands: Operands
            }
        }>
    }
) {
    //Implement that
    for (const [state, tagId, config] of events.for) {
        // ...
    }
}

const t = createStateMachine<"A" | "D", "div1">({
    for: [
        ["A", "div1", {}],
        ["D", "div1", {}]
    ],
    transitions: [{
        from: "A",
        to: "D",
        when: {
            operator: "==",
            operands: ["@currentField", "x"]
        }
    }]
})