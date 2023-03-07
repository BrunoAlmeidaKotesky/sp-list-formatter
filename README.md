# sp-list-formatter

Create SharePoint list formatters with ease.

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

#### Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

#### Known issues
- **`ListFormatterBuilder`** `init` method exposes some internal implementation details from the class, please note that only `addElement` or `addChildren` should be called after init.
    - This happens because of some unknown type narrowing issue in TypeScript with the `InitialState` interface. If you have any ideas on how to fix this, please open an issue or a PR.