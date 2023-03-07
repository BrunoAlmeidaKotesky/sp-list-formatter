## SchemaToHtmlParser

This class can be used if you want to do the exact opposite of the [`HtmlToListParser`](./HtmlToListParser.md). It can be used to convert a SharePoint JSON schema to HTML.

#### Constructor
If you want, you can pass a parsed [`HTMLListSchema`](./ConstantsAndTypes.md#htmllistschema) object to the constructor to make the parser faster, 
otherwise the `parse` will call `schemaAdapter` method to adapt the object.

<details>
<summary>Example: </summary>

```typescript
import {SchemaToHtmlParser, HTMLListSchema, JsonSchema} from 'sp-list-formatter';

const myPreviousConvertedObj: JsonSchema = {
    elmType: 'div',
    inlineEditField: true,
    debugMode: true,
    //And so on...
}

const manuallyConvertedObj: HTMLListSchema =  {
    elmType: 'div',
    children: myPreviousConvertedObj.children
    //And so on...
}

//It's preferable not to pass the object to the constructor, since `schemaAdapter` can do that for you.
const parser = new SchemaToHtmlParser(manuallyConvertedObj);
```

</details>

#### Methods:

* **`schemaAdapter`**: This method is used to adapt the JSON schema to the HTML schema. It's called by the `parse` method if no object is passed to the constructor.
    - If you've converted using this method and is passing the resulting object to the constructor, that will be pointless, since it'll basically do the same thing if you didn't pass it.

* **`parse`**: Parse the SharePoint JSON schema to a HTML string.

#### Usage:

<details>
<summary>Code: </summary>


```typescript
    import {SchemaToHtmlParser} from 'sp-list-formatter';
    const schema = {
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
    const result = new SchemaToHtmlParser().parse();
    console.log(result);
```

</details>

<details>
<summary>Output as HTML: </summary>

```html
<div><div style="background-color: black; "><span style="color: black; "><a>Link text</a><img></img></span></div><div>Text 1</div><span>Text 2</span></div>
```