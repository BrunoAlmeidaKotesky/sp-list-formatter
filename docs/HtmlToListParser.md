## HtmlToListParser

You can se this class to easily convert a HTML string to the SharePoint JSON schema without any knowledge of the JSON schema.
Yet you can still use some additional configurations from [`FormatterOptions`](./ConstantsAndTypes.md#formatteroptions) by using `data` attributes or just normal allowed attributes.

Internally it uses the [`parse5`](https://parse5.js.org/index.html) library to parse the HTML string to a DOM tree, and then it uses the [`ListFormatterBuilder`](docs/ListFormatterBuilder.md) to convert the DOM tree to the JSON schema.

#### Data attributes
To make sure that you can still configure some of the options from [`FormatterOptions`](./ConstantsAndTypes.md#formatteroptions) that you normally cant set by just regular tags attributes, you can use data attributes with the string values, here is a list of the data attributes and their corresponding [`FormatterOptions`](./ConstantsAndTypes.md#formatteroptions) properties:

| Data attribute | [`FormatterOptions`](./ConstantsAndTypes.md#formatteroptions) property |
|----------------|-----------------------------|
| data-debug-mode | debugMode |
| data-for-each | forEach |
| data-custom-row-actions | customRowActions |
| data-default-hover-field | defaultHoverField |
| data-file-preview | filePreviewProps |
| data-inline-edit | inlineEditField |
| data-operands | operands |
| data-operator | operator |

#### Constructor
You can pass an additional [`ParserOptions<DefaultTreeAdapterMap>`](https://parse5.js.org/interfaces/parse5.ParserOptions.html) from the [`parse5`](https://parse5.js.org/index.html) library to the constructor, this will be used when parsing the HTML string.

#### Methods

- **`inlineHtml`** Minify the HTML string to just a single line.

    You don't need to use this method if you are using the `parse` method, since it'll already be used internally to minify the HTML string before parsing it, we just expose it in case you want to use it.

- **`parse`** Parse your html string to the corresponding JSON schema. Please note that you if you use the `html` and/or `body` tag as the root element, it'll throw an error, your root should be one the allowed element types.


#### Usage:

- `inlineHtml`:
    ```typescript
    import {HtmlToListParser} from 'sp-list-formatter';

    const html = `
        <div>
            <div> <span>Text</span>  </div>
        </div>
    `
    const result = new HtmlToListParser().inlineHtml(html);
    console.log(result);
    //Output: <div><div><span>Text</span></div></div>
    ```

- `parse`:

    <details>
    <summary>Code: </summary>

    ```typescript
    import {HtmlToListParser} from 'sp-list-formatter';
    //Or read it from your file system and convert it to a string
    const html = `
        <div data-debug-mode="true" style="color: red; background-color: green;">
            <ul id="list-container">
                <li id="item-1"><a id="link" href="https://github.com">Link</a></li>
                <li id="item-2">Text</li>
            </ul>
        </div>
    `;
    //Note that you call also pass an addtional parser configuration from `parse5` for theconstructor
    const result = new HtmlToListParser().parse(html);
    console.log(result);
    ```

    As mentioned on [ListFormatterBuilder Id Explanation](./ListFormatterBuilder.md#usage), by using id's to each unique element, 
    it'll help the parsing to be a little bit faster by tracking the the information for adding `#text` nodes.

    </details>

    <details>
    <summary>JSON Output: </summary>

    ```json
    {
        "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
        "debugMode": true,
        "elmType": "div",
        "style": {
            "color": "red",
            "background-color": "green"
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
                                "attributes": {
                                    "href": "https://github.com"
                                },
                                "txtContent": "Link"
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
    }
    ```

    </details>