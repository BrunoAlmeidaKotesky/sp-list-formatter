# sp-list-formatter

__*Format SharePoint lists with ease*__
#### Motivation
Styling SharePoint forms, columns and views by writing plain JSON is a pain, and it's easy to make mistakes. This library aims to make it easier to create list formatters. 

Just use the fluent builder API to create your formatting with type safety, or __*even better*__, convert your HTML to the SharePoint JSON schema.

#### Installation
*Works both on node and browser*

```bash
npm install sp-list-formatter
# or
yarn add sp-list-formatter
# or
pnpm add sp-list-formatter
```

#### Documentation and examples
* [ListFormatterBuilder](docs/ListFormatterBuilder.md)
* [HtmlToListParser](docs/HtmlToListParser.md)
* [SchemaToHtmlParser](docs/SchemaToHtml.md)
* [Helper constants and types](docs/ConstantsAndTypes.md)

#### Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information about what has changed recently.

#### Roadmap
- [ ] Create an easy way to write complex expressions (`operands` and `operators`), probably with a
[`Expressions`](https://github.com/BrunoAlmeidaKotesky/sp-list-formatter/blob/c4d3d677735689c55788c7ce4143c47f7c86ed73/lib/modules/Expressions.ts) class and a proposal [`createStateMachine`](https://gist.github.com/BrunoAlmeidaKotesky/56c29a2b547ffeda62741c0771df2aea) function.
- [ ] Create a playground to test the library and see the results in real time, also with a code editor for [`HtmlToListParser`](docs/HtmlToListParser)
- [ ] Create more examples, since all the examples from the docs are in the tests, it would nice to have pnp calculator example.

#### Known issues
- **`ListFormatterBuilder`** `init` method exposes some internal implementation details from the class, please note that only `addElement` or `addChildren` should be called after init.
    - This happens because of some unknown type narrowing issue in TypeScript with the `InitialState` interface. If you have any ideas on how to fix this, please open an issue or a PR.