/// <reference types="vitest" />
import { ListFormatterBuilder, convertSchemaToHtml } from '../lib/index';

it('Should generate the most basic column formatting', () => {
    const result = ListFormatterBuilder.init('div')
        .addChildren((child) =>
            child
                .addElement({ tag: 'div' }, (div) =>
                    div.addElement({ tag: 'span', style: [{ color: 'black' }] },
                        (child) => child.addElement({ tag: 'span' }).addElement({ tag: 'span' })
                    )
                )
                .addElement({ tag: 'span' })
        )
        .addChildren(c => c.addElement({ tag: 'span' }))
        .build();

    console.log(result);
    expect(result).toStrictEqual(EXPECTED.CASE_2);
});

it('Should convert the Column formatter JSON Schema to valid HTML', () => {
    const result = convertSchemaToHtml(JSON.parse(EXPECTED.CASE_1));
    expect(result).not.be.null;
    expect(result).not.be.empty;
    expect(result).not.be.undefined;
});

const EXPECTED = {
    CASE_1: `{"$schema":"https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json","elmType":"div","attributes":{"href":"_blank","title":"Hello World"},"style":{"border-bottom-right-radius":"10px"}}`,
    CASE_2: {
        "elmType": "div",
        "attributes": {
            "href": "...",
            "erw": "d"
        },
        "styles": {
            "color": "red"
        },
        "children": [
            {
                "elmType": "span1",
                "children": [
                    {
                        "elmType": "div",
                        "children": [
                            {
                                "elmType": "a1"
                            },
                            {
                                "elmType": "a2"
                            }
                        ]
                    }
                ]
            },
            {
                "elmType": "span2"
            },
            {
                "elmType": "span3"
            }
        ]
    }
}