# ZEP Script App Template with React Widget

Template for ZEP Script app.

## Directory Structure

```
📦Project Root
┣ 📂res
┣ 📂src
┃ ┗ main.ts
┣ 📂widget
┃ ┣ 📂src
┃ ┃ ┗ main.tsx
┃ ┗ index.html
┣ package.json
┣ tsconfig.json
┗ tsconfig.zep.json
```

- `📂res`: Put all the resources(images, sounds) of the app inside this folder.
- `📂src`: Put all sources of your zep script app inside this folder.
- `src/main.ts`: Main entry file of the app. The name of this file should not be changed.
- `📂widget`: inside this folder.
- `widget/index.html`: Main document file of your vite react widget. The name of this file should not be changed.
- `widget/src/main.ts`: Main entry file of your vite react widget. The name of this file should not be changed.
- `package.json`: Package.json file.
- `tsconfig.json`: TypeScript configuration file.
- `yarn.lock`: Yarn lock file.

## Usage

### Build the project

Build the project by running the following command.

```bash
yarn build
```

### Publish the app 

#### By CLI

Publish your app by running the following command. You have to fill in configuration file(`zep-script.json`) before running this command.

```bash
yarn deploy
```

#### By Web UI

You can also upload the generated project archive(*.zepapp.zip) in the [ZEP app manage page](https://zep.us/me/apps/).

#### `zep-script.json`

- `appId`: The app id of the app. Leave it empty if you want to publish a new app. Setting this property will update the app already uploaded.
- `name`: Name of the app.
- `description`: Description of the app.
- `type`: Type of the app. Must be one of `normal`, `minigame`, `sidebar`.

### ZEP Script API Documentation

- [English](https://docs.zep.us/zep-script)
- [Korean](https://docs-kr.zep.us/zep-script)
