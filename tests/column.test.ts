/// <reference types="vitest" />
import { ListFormatterBuilder, convertSchemaToHtml } from '../lib/index';

it('Should generate the most basic column formatting', () => {
    const result = ListFormatterBuilder.init('div')
        .addChildren((child) =>
            child
                .addElement({ elmType: 'div', style: { "background-color": "black" } }, (div) =>
                    div.addElement({ elmType: 'span', style: { color: 'black' } },
                        (child) => child.addElement({ elmType: 'a', id: "link1", txtContent: "Link text" }, tag => tag.addElement({elmType: 'span'})).addElement({ elmType: 'img' })
                    )
                )
                .addElement({ elmType: 'span' })
        )
        .addChildren(c => c.addElement({ elmType: 'span' }))
        .build();

    console.log(JSON.stringify(result, null, 2));
    expect(result).toEqual(EXPECTED.JSON_SCHEMA_1);
});

it('Should convert the Column formatter JSON Schema to valid HTML', () => {
    const result = convertSchemaToHtml(JSON.parse(EXPECTED.JSON_TO_HTML));
    expect(result).not.be.null;
    expect(result).not.be.empty;
    expect(result).not.be.undefined;
});

const EXPECTED = {
    JSON_TO_HTML: `{"$schema":"https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json","elmType":"div","attributes":{"href":"_blank","title":"Hello World"},"style":{"border-bottom-right-radius":"10px"}}`,
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
                "elmType": "span"
            },
            {
                "elmType": "span"
            }
        ]
    }
}