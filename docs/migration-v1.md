# Migrating from v0.x to v1

ZEP Script SDK has been improved to provide better developer experience. This document describes the changes from v0.x to v1.

## Breaking / Major changes

### Module Bundling

ZEP Script CLI v1 adds module bundling feature backed up by [Rollup](https://rollupjs.org/).

This feature enables developer to write codes in separate files and import them.

Following syntax is supported with v1 CLI:

```ts filename="src/index.ts"
import { add } from './add'

ScriptApp.showCenterLabel(`1 + 2 = ${add(1, 2)}`);
```

```ts filename="src/add.ts"
export function add(a: number, b: number) {
  return a + b;
}
```

```bash
zep-script build
```

### React Widget Support

Creating script widget with React is now supported backed up by [Vite](https://vitejs.dev/).

TBD

### Changes in CLI

#### `zep-script archive` removal

`zep-script archive` command has been removed, in order to reduce the complexity of development flow.
`zep-script build` command now builds the project and also generates the archive file.

#### New `zep-script login` command

`zep-script login` command has been added to login to ZEP.
In v0.x, running `zep-script publish` command without login would prompt login, but there was some issue with this flow.
In v1, you need to run `zep-script login` command to login to ZEP before running `zep-script publish`.
You only need to run `zep-script login` once, and the login status will be persisted.

## Recommended migration step

### 1. Global namespace type inference

Remove `zep-script` import from your source code.

```diff
- import 'zep-script';
```

Instead, Add `zep-script` to `compilerOptions.types` array in your tsconfig.json:

```json5 filename="tsconfig.json"
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

### 2. Move `main.ts` to `src/main.ts`

Entry point is changed to support module bundling. 
Move your entry point of your project from `main.ts` to `src/main.ts`.

```
📁 project root
┣ 📁 res
┣ 📁 src
┃ ┗ 📄 main.ts <-- This is entry file of your project
┣ 📄 package.json
┣ 📄 tsconfig.json
┣ 📄 yarn.lock
┗ 📄 zep-script.json
```

### 3. Remove `babel.config.js`

Remove `babel.config.js` file from your project root, as it is no longer needed.
ZEP script CLI would handle the babel configuration internally.