
import { parse, ParserOptions } from 'parse5';
import { ListFormatterBuilder } from './ListFormatterBuilder';
import { ATTRIBUTES, DATA_ATRIBUTES } from '../constants';
import type { Attributes, ElementTypes, DataAttributes } from '../constants';
import type { TextNode, Element, DefaultTreeAdapterMap } from 'parse5/dist/tree-adapters/default';
import type { AttributesConfig, FormatterOptions, StylesConfig, JsonSchema, ChildrenState } from '../types';
import { Attribute } from 'parse5/dist/common/token';

export class HtmlToListParser {
    #processNodeCount = 0;
    constructor(private parserConfig?:  ParserOptions<DefaultTreeAdapterMap> | undefined) {}
     #styleToObj(styles: string): StylesConfig { 
        return styles
        ?.split(";")
        ?.map(style => style.split(":")
        ?.map(part => part.trim()))
        ?.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    }

    #findFirstNode = (html: string) => {
        const doc = parse(html, { scriptingEnabled: false, ...this?.parserConfig });
        const htmlNode = doc.childNodes[0];
        if (!(htmlNode.nodeName === 'html' && htmlNode.childNodes[1].nodeName === 'body'))
            throw new Error('Invalid html, you must not have a body or html tag');
        const firstNode = htmlNode.childNodes[1].childNodes[0];
        if (!firstNode) throw new Error('Could not find the root node');
        return firstNode;
    }
    
    #parseDataAttribValue(value: string): string | boolean | object {
        return value.startsWith('{') ? JSON.parse(value) : value === 'true' ? true : value === 'false' ? false : value;
    }

    #addDataAttributes = (attrs: Attribute[], element: FormatterOptions) => {
        const validAttrs: Map<DataAttributes, keyof FormatterOptions> = new Map([
            ['data-debug-mode', 'debugMode']
        ]);
        const dataAttributes = attrs.reduce((acc: Partial<FormatterOptions>, attr) => {
            const name = attr.name as DataAttributes;
            if (DATA_ATRIBUTES.includes(name)) {
                const key = validAttrs.get(name)!;
                // @ts-ignore
                acc[key] = this.#parseDataAttribValue(attr.value);    
            }
            return acc;
        }, {});
        for (const [k, v] of Object.entries(dataAttributes) as [keyof FormatterOptions, unknown][]) {
            //@ts-ignore
            element[k] = v;
        }
    }

    #addNodeData(node: Element): FormatterOptions {
        const element: FormatterOptions = {
            elmType: node.tagName.toLowerCase() as ElementTypes,
        };
        const attributes = node?.attrs.reduce((acc: AttributesConfig, attr) => {
            if (attr.name !== 'style' && ATTRIBUTES.includes(attr.name as Attributes))
                acc[attr.name as Attributes] = attr.value;
            return acc;
        }, {});
        const styles = this.#styleToObj(node.attrs.find((attr) => attr.name === 'style')!?.value);
        if(styles && Object.keys(styles).length > 0) 
            element.style = styles;
        if(attributes && Object.keys(attributes).length > 0) 
            element.attributes = attributes;
        this.#addDataAttributes(node.attrs, element);
        return element;
    }

    #processNode(node: Element, parentBuilder: ListFormatterBuilder) {
        if (node.nodeName !== 'html' && node.nodeName !== 'body' && node.nodeName !== '#text') {
            const element = this.#addNodeData(node);
            if(this.#processNodeCount !== 1) {
                let tempBuilder: ChildrenState<ListFormatterBuilder> | null = null;
                if(node?.childNodes?.length > 0) {
                    tempBuilder = parentBuilder!.addElement(element, self => {
                        node.childNodes.forEach(n => this.#processNode(n as Element, self as unknown as ListFormatterBuilder));
                        return self;
                    });
                }
            } else {
                parentBuilder.result = element;
                this.#processNodeCount += 1;
                node.childNodes.forEach((childNode: any) => this.#processNode(childNode, parentBuilder ));
            }
        } else if (node.nodeName === '#text') {
            const text = (node as unknown as TextNode)?.value?.trim();
            if (text.length > 0) {
                //parentBuilder?.addText(text);
            } else {
                console.warn('Empty text node found from', node.parentNode?.nodeName);
            }
        }
    }

    /**The HTML string to be parsed as the JSON Schema.
     * 
     *You don't need to include `<html>` and `<body>` tags. The parser will find the first node and use it as the root node.
    */
    public parse(html: string): JsonSchema {
        const rootNode = this.#findFirstNode(html);
        const builder = ListFormatterBuilder.init(rootNode.nodeName as ElementTypes);
        this.#processNodeCount += 1;
        this.#processNode(rootNode as Element, builder);
        this.#processNodeCount = 0;
        return builder.build();
    }
}