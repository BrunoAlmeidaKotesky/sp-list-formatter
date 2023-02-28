
import {parse} from 'parse5';
import { AttributesConfig, ChildrenState, FormatterOptions, StylesConfig,  } from '../types';
import { ListFormatterBuilder } from './ListFormatterBuilder';
import type { ElementTypes } from '../constants';
import { TextNode } from 'parse5/dist/tree-adapters/default';

const styleToObj = (styles: string) => styles
    .split(";")
    .map(style => style.split(":").map(part => part.trim()))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as StylesConfig;

const findFirstNode = (html: string) => {
    const doc = parse(html, { scriptingEnabled: false });
    const htmlNode = doc.childNodes[0];
    if (!(htmlNode.nodeName === 'html' && htmlNode.childNodes[1].nodeName === 'body'))
        throw new Error('Invalid html');
    const firstNode = htmlNode.childNodes[1].childNodes[0];
    if(!firstNode) throw new Error('Could not find the root node');
    return firstNode;
}

function htmlToListFormatterParser(html: string): Record<string, any> {
    const rootNode = findFirstNode(html);
    const builder = new ListFormatterBuilder();

    function processNode(node: typeof rootNode, parentBuilder: ListFormatterBuilder) {
        if (node.nodeName === ElementType) {
            const element: FormatterOptions = {
                tag: node.tagName.toLowerCase() as ElementTypes,
                attributes: node.attributes.reduce((acc: AttributesConfig, attr) => {
                    if(attr.name !== 'style')
                        acc[attr.name] = attr.value;
                    return acc;
                }, {}),
                style: styleToObj(node.attributes.find((attr) => attr.name === 'style')!?.value)
            };
            const childrenBuilder = parentBuilder.addElement(element);
            node.childNodes.forEach((childNode: any) => processNode(childNode, childrenBuilder));
        } else if (node.nodeName === '#text') {
            const text = (node as TextNode)?.value?.trim();
            if (text.length > 0) {
                parentBuilder.addText(text);
            } else {
                console.warn('Empty text node found from', node.parentNode?.nodeName);
            }
        }
    }

    processNode(rootNode, builder);
    return builder.build();
}