# ZEP Script

Development support for [ZEP](https://zep.us) Script.

## Installation

### Initialize a new ZEP Script project

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

Add following at the top of your main.ts file:

```js
import 'zep-script';
```

Then you will be able to use ZEP Script's namespaces in global scope.

```ts
import 'zep-script';

ScriptApp.showCenterLabel("Hello world");
```

### API hover language

Editor hovers are rendered from the JSDoc comments in the `.d.ts` file that TypeScript loads for the imported module. TypeScript does not switch third-party package comments by the user's editor locale, so one `import 'zep-script'` entrypoint cannot automatically show Korean comments for Korean users and English comments for English users.

If localized API hovers are required, provide separate declaration entrypoints (for example `zep-script/ko` and `zep-script/en`) or separate packages with language-specific `.d.ts` files. The current package ships one shared declaration set.

### Zero-downtime deployment migration

Use `ScriptApp.onMigrationStart` to persist in-memory state before server migration, then restore it from storage when the app starts again. Players who rejoin through migration can be detected with `player.isMigrationJoin`.

```ts
ScriptApp.onMigrationStart.Add(() => {
  ScriptApp.setStorage(JSON.stringify(currentGameState));
});

ScriptApp.onInit.Add(() => {
  ScriptApp.getStorage((savedState) => {
    if (savedState) {
      restoreGameState(JSON.parse(savedState));
    }
  });
});

ScriptApp.onJoinPlayer.Add((player) => {
  if (player.isMigrationJoin) {
    restorePlayerState(player);
  }
});
```

### Transpiling

As some APIs of ZEP Script conflicts with TypeScript's namespaces, you need to use babel to transpile your code.

Add plugin to your babel config:

```js
module.exports = {
  // ...
  plugins: [
    // ...
    '@zep.us/zep-script',
  ],
};
```

## ZEP Script API Documentation

Refer to official documentation page:

- [English](https://docs.zep.us/zep-script)
- [Korean](https://docs-kr.zep.us/zep-script)
