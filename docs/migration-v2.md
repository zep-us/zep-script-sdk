# Migrating from v1 to v2

ZEP Script SDK has been improved to provide better developer experience. This document describes the changes from v1 to v2.

## Major changes

### Module Bundling

ZEP Script CLI v2 adds module bundling feature backed up by [Rollup](https://rollupjs.org/).

This feature enables developer to write codes in separate files and import them.

Following syntax is supported with v2 CLI:

```ts filename="src/index.ts"
import { add } from './add'

ScriptApp.showCenterLabel(`1 + 2 = ${add(1, 2)}`);
```

```ts filename="src/add.ts"
export function add(a: number, b: number) {
  return a + b;
}
```

In order to support this feature, javascript project must be built as well as TypeScript project, using ZEP Script CLI.
Following command will produce bundled javascript file in `dist` directory.

```bash
npx zep-script build
```

### React Widget Support

Creating script widget with React is now supported backed up by [Vite](https://vitejs.dev/).

TBD

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

### 2. Move main.ts to src/index.ts

Entry point is changed to support module bundling. 
Move your entry point of your project from `main.ts` to `src/index.ts`.

```
📁 project root
├── 📁 res
├── 📁 src
│   └── 📄 index.ts <-- This is entry file of your project
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 yarn.lock
└── 📄 zep-script.json
```
