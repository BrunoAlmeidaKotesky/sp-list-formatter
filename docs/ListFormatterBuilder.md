## ListFormatterBuilder

The list formatter builder is the main module of this library. It's a fluent API that allows you to create the JSON schema for SharePoint in a type-safe way.

If you don't feel like using the fluent API, you can use the [`HtmlToListParser`](docs/HtmlToListParser.md) to convert your HTML to the JSON schema.

#### Explanation

The class consists of a fluent API with type narrowing, so you can only call methods that are available in the current state. For example, if you call `init`, you **should** only call `addElement` or `addChildren`, and with `addElement` you can only call `addChildren`, `addElement` or `build` to generate the JSON schema.

* **`init`** You **must not** instantiate the class directly, instead you must call the static `init` method. It receives the root element type as first parameter and the second parameter is optional and is the rest of that div configuration of type [`FormatterOptions`]() without `elmType`.

* **`addElement`** receives two parameters: a configuration of the type [`FormatterOptions`]() which represent most of the SharePoint syntax options allowed, and a callback that receives the current state of the builder and returns the next state. This callback is used to add children to the current element, or add another element to the same level.

* **`addChildren`** Can be used to add children to the current element. It receives a callback that receives the current state of the builder and returns the next state. This callback is used to add children to the current element, or add another element to the same level. 

* **`build`** returns the final JSON schema of type [`JsonSchema`]() for the list formatter.

Using `addChildren` or the callback on `addElement` to add children to the current element is the same thing, it's just a matter of preference.

#### Usage

* This examples show's that you can either use `addChildren` or `addElement` for child nodes.
    <details>
    <summary>Code: </summary>

    ```typescript
    //Init receives the root element type, in this case a div
    const result = ListFormatterBuilder.init('div')
    .addChildren(child => child
        //Adding the first child to the root div, which is a div with a span with an anchor and image tag.
        .addElement({ elmType: 'div', style: { "background-color": "black" }}, child =>
            child.addElement({ elmType: 'span', style: { color: 'black' } }, child => 
                child.addElement({ elmType: 'a', id: "link1", txtContent: "Link text" }, 
                    child => child.addElement({elmType: 'span'})).addElement({ elmType: 'img' })
            )
        )
        //Adding another sibling to the root div, which is a div with text content
        .addElement({ elmType: 'div', txtContent: 'Text 1' })
    )
    //Adding another sibling to the root div, which is a span with text content
    .addChildren(c => c.addElement({ elmType: 'span', txtContent: 'Text 2'  }))
    .build();

    console.log(result);
    ```

    </details>

    <details>
    <summary>That will log the following JSON:
    </summary>


    ```json
    {
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
    ```
    </details>

    Note that we passed a `id` parameter to the `a` element, but it's not present in the JSON Schema. That's because it make it easier to add `#text` elements (`txtContent`) internally on the class, it does't mean that you have always to specify it, but it does help the build process.

* You can store the current state of the builder in a variable to avoid nesting too much, like this:

    <details>
    <summary>Code: </summary>

    ```typescript
    import {ChildrenState, ListFormatterBuilder} from 'sp-list-formatter';

    const firstChildCb = (child: ChildrenState) => {
        return child.addElement({ elmType: 'span', style: { color: 'black' } }, child => {
            //... and returning child.
        });
    }
    const addChildCb = (child: ChildrenState) => {
        return child.addElement({ elmType: 'a', id: "link1", txtContent: "Link text" }, child => {
            //... and returning child.
        });
    }
    const builderWithOneChild = ListFormatterBuilder.init('div').addChildren(firstChildCb)
    const builderWithTwoChild = builderWithOneChild.addChildren(addChildCb)
    const result = builderWithTwoChild.build();
    ```
    </details>

#### Notes:
- Although the properties `removeId` and `result`, and the method `findNodeById` are marked as public, you **must not** use them, they are used internally by the class and by [`HtmlToListParser`]().

##### To do:
    - Add more complex examples.