/// <reference types="vitest" />
import { ListFormatterBuilder, SchemaToHtmlParser } from '../lib/index';

it('Should generate the most basic column formatting', () => {
    const result = ListFormatterBuilder.init('div')
        .addChildren(child => child
            .addElement({ elmType: 'div', style: { "background-color": "black" }}, child =>
                child.addElement({ elmType: 'span', style: { color: 'black' } }, child => 
                    child.addElement({ elmType: 'a', id: "link1", txtContent: "Link text" }, 
                        child => child.addElement({elmType: 'span'})).addElement({ elmType: 'img' })
                )
            )
            .addElement({ elmType: 'div', txtContent: 'Text 1' })
        )
        .addChildren(c => c.addElement({ elmType: 'span', txtContent: 'Text 2'  }))
        .build();

    console.log(JSON.stringify(result, null, 2));
    expect(result).toEqual(EXPECTED.JSON_SCHEMA_1);
});

it('Should convert the Column formatter JSON Schema to valid HTML', () => {
    const result = new SchemaToHtmlParser().parse(EXPECTED.JSON_SCHEMA_1 as any);
    console.log(result);
    expect(result).not.be.null;
    expect(result).not.be.empty;
    expect(result).not.be.undefined;
});

const EXPECTED = {
    JSON_SCHEMA_1: {
        "elmType": "div",
        "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
        "children": [
            {
                "elmType": "div",
                "style": {
                    "background-color": "black"
                },
                "children": [
                    {
                        "elmType": "span",
                        "style": {
                            "color": "black"
                        },
                        "children": [
                            {
                                "elmType": "a",
                                "txtContent": "Link text"
                            },
                            {
                                "elmType": "img"
                            }
                        ]
                    }]
            },
            {
                "elmType": "div",
                "txtContent": "Text 1"
            },
            {
                "elmType": "span",
                "txtContent": "Text 2"
            }
        ]
    }
}