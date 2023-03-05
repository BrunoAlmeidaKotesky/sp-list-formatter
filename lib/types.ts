import type { Attributes, Styles, ElementTypes } from "./constants";

export type AttributesConfig = Partial<Record<Attributes, string>>;
export type StylesConfig = Partial<Record<Styles, string>>;
export type FormatterOptions = {
    elmType: ElementTypes,
    /**An unique identifier for each element, this will be removed when the JSON schema is generated. 
     * 
     *It helps the builder and the HTML parser to keep track of the elements and their children, for modifications and other operations.
    */
    id?: string;
    /** An optional property that specifies the text content of the element specified by `elmType`. The value of this property can either be a string (including special strings) or an Expression object.
     * 
     * If an element has the txtContent property, the child properties are ignored.
     */
    txtContent?: string;
    attributes?: AttributesConfig;
    style?: StylesConfig;
    /**An optional property that is meant for debugging. It outputs error messages and logs warnings to the console. */
    debugMode?: boolean;
    /**
     * An optional property that allows an element to duplicate itself for each member of a specific multi-value field or an array. The value of `forEach` property should be in the format of either `iteratorName in @currentField` or `iteratorName in [$FieldName]` or `iteratorName in Expression-Returning-An-Array`.

        iteratorName represents the name of iterator variable that is used to represent the current member of the multi-value field. The name of the iterator can be any combination of alphanumeric characters and underscore `(_)` that does not start with a digit.

        The field used in the loop must be in a supported field type with multi-value option enabled: Person, Lookup, and Choice. An expression returning an array can also be used.

        In the element with `forEach` or its children elements, the iterator variable can be referred as if it is a new field. The index of the iterator can be accessed with `loopIndex` operator.

        `forEach` cannot be applied to the root element, and will render no element if there is no value in the field.
     */
    forEach?: string;
    /**`button` elements can be used to launch a specific action on the parent item. 
     * 
     * Every `button` element has a required property, `customRowAction`, that specifies an action that's taken when the button is clicked. 
     */
    customRowAction?: CustomRowAction;
    /**Add a custom card to the element, that shows up on hover or click event. */
    customCardProps?: CustomCardProps;
    /**Adds the profile card for the people fields or file hover card for files in document library. */
    defaultHoverField?: string;
    /**Adds the field editor for the referenced column. */
    inlineEditField?: string;
    /**An optional property, that allows overriding the default styles of file type icon and brand type icon in filepreview elmType. */
    filePreviewProps?: FilePreviewProps;
    /**Operators specify the type of operation to perform. */
    operator?: Operators;
    /**Please read https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference */
    operands?: Operands;
};

interface BaseSchema {
    $schema: string, children?: JsonSchema[], txtContent?: string;
}
export interface JsonSchema extends FormatterOptions, BaseSchema {};

export interface DefaultClickAction {
    action: "defaultClick" | "share" | "delete" | "editProps" | "openContextMenu";
}

export interface SetValueClickAction {
    action: "setValue";
    actionInput: Record<string, string>;
}

export interface ExecuteFlowClickAction {
    action: "executeFlow";
    /**JSON */
    actionParams: {
        /**ID of the Flow to launch  */
        id: string;
        /**Sets the text at the top of the flow panel */
        headerText?: string;
        /** Sets the text of the primary button in the flow panel */
        runFlowButtonText?: string;
    };
}

export type CustomRowAction = DefaultClickAction | SetValueClickAction | ExecuteFlowClickAction;

export interface CustomCardProps {
    /**JSON object that defines formatting for custom cards. */
    formatter: Record<string, any>;
    /**Event on which the customCard should open. */
    openOnEvent: "click" | "hover";
    /**Specify the direction relative to the target in which custom card will be positioned.
     * 
     * This is the preferred location but is not guaranteed depending on space. */
    directionalHint: DirectionalHints;
    /**Specify if the beak is to be shown or not. */
    isBeakVisible: boolean;
    /**Specifies the style object for custom card's beak. */
    beakStyle?: StylesConfig;
}

export interface FilePreviewProps {
    fileTypeIconClass?: string;
    brandTypeIconClass?: string;
    fileTypeIconStyle?: StylesConfig;
    brandTypeIconStyle?: StylesConfig;
}

export type DirectionalHints = 
"bottomAutoEdge" | "bottomCenter" | "bottomLeftEdge" | "bottomRightEdge" | 
"leftBottomEdge" | "leftCenter" | "leftTopEdge" | 
"rightBottomEdge" | "rightCenter" | "rightTopEdge" | 
"topAutoEdge" | "topCenter" | "topLeftEdge" | "topRightEdge";

export type Operators = 
"+" |
"-" |
"/" |
"*" |
"<" |
">" |
"%" |
"==" |
"!=" |
"<=" |
">=" |
"||" |
"&&" |
"toString()" | `toString(${number | string})` |
"Number()" | `Number(${string})` |
"Date()" | `Date(${string})` |
"cos" | `cos(${number})` |
"sin" | `sin(${number})` |
"?" |
":" |
"toDateString()" | `toDateString(${string})` |
"toLocaleString()" | `toLocaleString(${string})` |
"toLocaleDateString()" | `toLocaleDateString(${string})` |
"toLocaleTimeString()" | `toLocaleTimeString(${string})` |
"indexOf" |
"toLowerCase" | `toLowerCase(${string})` |
"join" |
"length" | `length(${string})` | `length(${number})` |
"abs" | `abs(${number})` |
"loopIndex" |
"floor" | `floor(${number})` |
"ceiling" |
"pow" |
"substring" |
"getDate" |
"getMonth" |
"getYear" |
"toUpperCase" | `toUpperCase(${string})` |
"lastIndexOf" |
"startsWith" |
"endsWith" |
"replace" |
"replaceAll" |
"padStart" |
"padEnd" |
"getUserImage" |
"addDays" |
"addMinutes" |
"appendTo" |
"removeFrom" |
"split"

export type Operands = {operator: Operators, operands: Operands}[] | string | any[];

export interface InitialState<Builder> {
    addChildren: (builder: Builder) => ChildrenState<Builder>;
    addElement: (config: FormatterOptions) => ChildrenState<Builder>;
}

export interface ChildrenState<Builder> {
    addElement(
        config: FormatterOptions,
        callback?: (builder: ChildrenState<Builder>) => ChildrenState<Builder>
    ): this;
    addChildren: (builder: Builder) => ChildrenState<Builder>;
    build: () => Record<string, any>;
}