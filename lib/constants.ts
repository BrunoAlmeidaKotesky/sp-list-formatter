
export const ELEMENT_TYPES = [
    'div',
    'span',
    'a',
    'img',
    'svg',
    'path',
    'button',
    'filepreview'
] as const;

export const STYLES = [
'background-color',
'fill',
'background-image',
'border',
'border-bottom',
'border-bottom-color',
'border-bottom-style',
'border-bottom-width',
'border-color',
'border-left',
'border-left-color',
'border-left-style',
'border-left-width',
'border-right',
'border-right-color',
'border-right-style',
'border-right-width',
'border-style',
'border-top',
'border-top-color',
'border-top-style',
'border-top-width',
'border-width',
'outline',
'outline-color',
'outline-style',
'outline-width',
'border-bottom-left-radius',
'border-bottom-right-radius',
'border-radius',
'border-top-left-radius',
'border-top-right-radius',
'box-decoration-break',
'box-shadow',
'box-sizing',
'overflow-x',
'overflow-y',
'overflow-style',
'rotation',
'rotation-point',
'opacity',
'cursor',
'height',
'max-height',
'max-width',
'min-height',
'min-width',
'width',
'flex-grow',
'flex-shrink',
'flex-flow',
'flex-direction',
'flex-wrap',
'flex',
'justify-content',
'align-items',
'box-align',
'box-direction',
'box-flex',
'box-flex-group',
'box-lines',
'box-ordinal-group',
'box-orient',
'box-pack',
'font',
'font-family',
'font-size',
'font-style',
'font-variant',
'font-weight',
'font-size-adjust',
'font-stretch',
'grid-columns',
'grid-rows',
'margin',
'margin-bottom',
'margin-left',
'margin-right',
'margin-top',
'column-count',
'column-fill',
'column-gap',
'column-rule',
'column-rule-color',
'column-rule-style',
'column-rule-width',
'column-span',
'column-width',
'columns',
'padding',
'padding-bottom',
'padding-left',
'padding-right',
'padding-top',
'bottom',
'clear',
'clip',
'display',
'float',
'left',
'overflow',
'position',
'right',
'top',
'visibility',
'z-index',
'border-collapse',
'border-spacing',
'caption-side',
'empty-cells',
'table-layout',
'color',
'direction',
'letter-spacing',
'line-height',
'text-align',
'text-decoration',
'text-indent',
'text-transform',
'unicode-bidi',
'vertical-align',
'white-space',
'word-spacing',
'hanging-punctuation',
'punctuation-trim',
'text-align-last',
'text-justify',
'text-outline',
'text-overflow',
'text-shadow',
'text-wrap',
'word-break',
'word-wrap',
'stroke',
'fill-opacity',
'--inline-editor-border-width',
'--inline-editor-border-style',
'--inline-editor-border-radius',
'--inline-editor-border-color',
'-webkit-line-clamp',
'object-fit',
'transform'
] as const;

export const ATTRIBUTES = [
"href",
"rel",
"src",
"class",
"target",
"title",
"role",
"iconName",
"d",
"aria",
"data-interception",
"viewBox",
"preserveAspectRatio",
"draggable"
] as const;

export const SCHEMA = "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json";

export type Styles = typeof STYLES[number];
export type ElementTypes = typeof ELEMENT_TYPES[number];
export type Attributes = typeof ATTRIBUTES[number];