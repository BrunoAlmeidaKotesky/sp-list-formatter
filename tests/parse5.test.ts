import {HtmlToListParser} from '../lib/modules/HtmlToListParser';

it('Should parse the most basic html string to an valid JSON schema', () => {
    const result = new HtmlToListParser().parse(`
    <div style="color: red; background-color: green;">
        <ul id="list-container">
            <li id="item-1"><a id="link" href="https://github.com">Link</a></li>
            <li id="item-1">Text</li>
        </ul>
    </div>`);
    //expect the result to be equal to the expected object
    console.log(JSON.stringify(result, null, 2));
    expect(result).toEqual({
        "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
        "debugMode": true,
        "elmType": "div",
        "style": {
            "color": "red",
            "backgroundColor": "green"
        },
        "children": [
            {
                "elmType": "ul",
                "children": [
                    {
                        "elmType": "li",
                        "children": [
                            {
                                "elmType": "a",
                                "style": {},
                                "attributes": {
                                    "href": "https://github.com"
                                },
                                "children": [
                                    "Item 1"
                                ]
                            }
                        ]
                    },
                    {
                        "elmType": "li",
                        "txtContent": "Text"
                    }
                ]
            }
        ]
    });
});