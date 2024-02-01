# ZEP Script

Development support for [ZEP](https://zep.us) Script.

## Installation

### Initialize a new ZEP Script project template

```bash
npx zep-script init MyZepApp
```

### Add to existing ZEP Script project

```bash
yarn add zep-script --dev
# or
npm install zep-script --save-dev
```

## Usage

### Using CLI

You can use useful command line interface provided by this package. 

See usage of the CLI in [here](https://github.com/zep-us/zep-script-sdk/tree/main/packages/zep-script-cli).

### TypeScript support

You can use TypeScript type definitions provided by this package.

Add `zep-script` to `compilerOptions.types` array in your tsconfig.json:

```json5
{
  // ...
  "compilerOptions": {
    // ...
    "types": [
      // ...
      "zep-script",
    ],
  }
}
```

Then you will be able to use ZEP Script's namespaces in global scope.

```ts filename="src/index.ts"
ScriptApp.showCenterLabel("Hello world");
```

## ZEP Script API Documentation

Refer to official documentation page:

- [English](https://docs.zep.us/zep-script)
- [Korean](https://docs-kr.zep.us/zep-script)
