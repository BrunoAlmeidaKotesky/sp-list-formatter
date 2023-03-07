## Constants and Types

This document describes the constants and types used in the API, there are all exported from the `sp-list-formatter` if you want to use them.

#### List of available constants:

| Name                | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| `ELEMENT_TYPES`     | A list of all the possible element types.                                            |
| `STYLES`            | A list of all the possible styles values.                                            |
| `ATTRIBUTES`        | A list of all the possible attributes values.                                        |
| `DATA_ATRIBUTES`    | A list of all the `data` attributes that can be used on your HTML string.            |
| `ATTRIBUTES_MAP`    | A map of all the attributes values to their corresponding `data` attribute.          |
| `SCHEMA`            | The value of `$schema` for SharePoint formatting.                                    |
| [`FIELD_HELPERS`](#field_helpers) | An object containing many constant values and functions that help's with some fields |

###### FIELD_HELPERS
As said above, it contains some constants to help with some available keywords from the official syntax.

<details>
<summary>It has the following structure: </summary>

 
```typescript
export const FIELD_HELPERS = {
    CURRENT_FIELD: "@currentField",
    CURRENT_FIELD_VALUE: (value: string | string[]) => {
        if(Array.isArray(value))
            return `@currentFieldValue.${value.join(".")}` as const;
        return `@currentFieldValue.${value}` as const;
    },
    ME: "@me",
    FIELD: (name: string) => `\$[${name}]` as const,
    FIELD_VALUE: (value: string | string[]) => {
        if(Array.isArray(value))
            return `\[$${value.join(".")}]` as const;
        return `\[$${value}]` as const;
    },
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
```

</details>

#### Types and Interfaces:

The `Styles`, `DataAttributes`, `Attributes`, `ElementTypes` types are basic the union types of the constants above.

###### `FormatterOptions`:
The main interface that you can use to configure the builder, it reflect on the [official syntax reference](https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference) with some additional props.

<details>
<summary>Show table: </summary>

| Property            | Type | Description |
| ------------------- | ------------------------------------------- | ------------------------- |
| `elmType` | `ElementTypes` | The type of the tag element |
| `id` | `string` | An unique identifier for each element, this will be removed when the JSON schema is generated. It helps the builder and the HTML parser to keep track of the elements and their children, for modifications and other operations. |
| `txtContent` | `string` | An optional property that specifies the text content of the element specified by `elmType`. The value of this property can either be a string (including special strings) or an Expression object. If an element has the txtContent property, the child properties are ignored. |
| `attributes` | `AttributesConfig` | The allowed attributes |
| `style` | `StylesConfig` | The allowed style properties |
| `debugMode` | `boolean` | An optional property that is meant for debugging. It outputs error messages and logs warnings to the console. |
| `forEach` | `string` | An optional property that allows an element to duplicate itself for each member of a specific multi-value field or an array. The value of `forEach` property should be in the format of either `iteratorName in @currentField` or `iteratorName in [$FieldName]` or `iteratorName in Expression-Returning-An-Array`. `iteratorName` represents the name of iterator variable that is used to represent the current member of the multi-value field. The name of the iterator can be any combination of alphanumeric characters and underscore `(_)` that does not start with a digit. The field used in the loop must be in a supported field type with multi-value option enabled: Person, Lookup, and Choice. An expression returning an array can also be used. In the element with `forEach` or its children elements, the iterator variable can be referred as if it is a new field. The index of the iterator can be accessed with `loopIndex` operator. `forEach` cannot be applied to the root element, and will render no element if there is no value in the field. |
| `customRowAction`   | `CustomRowAction` | `button` elements can be used to launch a specific action on the parent item. Every `button` element has a required property, `customRowAction`, that specifies an action that's taken when the button is clicked. |
| `customCardProps`   | `CustomCardProps` | Add a custom card to the element, that shows up on hover or click event. |
| `defaultHoverField` | `string`| Adds the profile card for the people fields or file hover card for files in document library. |
| `inlineEditField`   | `string` | Adds the field editor for the referenced column. |
| `filePreviewProps`  | `FilePreviewProps` | An optional property, that allows overriding the default styles of file type icon and brand type icon in filepreview elmType. |
| `operator` | `Operators` | Operators specify the type of operation to perform. |
| `operands` | `Operands` \| `Array<Operands>` \| `Object` | Please read https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/formatting-syntax-reference |

</details>

###### `JsonSchema`: 
This type is basically the union of [`FormatterOptions`](#formatteroptions) with `BaseSchema`, which is just:
```typescript
interface BaseSchema {
    $schema: string, children?: JsonSchema[], txtContent?: string;
}
```

###### `HTMLListSchema`:
This type removes `operands` , `operator` , `filePreviewProps` , `inlineEditField` , `defaultHoverField` , `customCardProps` ,  `children` ,`customRowAction` , `forEach` , `debugMode` , `$schema` fom [`FormatterOptions`](#formatteroptions) and makes `children` be an array of `HTMLListSchema` instead of `JsonSchema`.


__TO DO:__ Add the rest of the types and interfaces to the documentation.