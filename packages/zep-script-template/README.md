# ZEP Script App Template

Template for ZEP Script app.

## Directory Structure

```
📦Project Root
 ┣ 📂res
 ┣ babel.config.js
 ┣ main.ts
 ┣ package.json
 ┣ tsconfig.json
 ┗ yarn.lock
```

- `📂res`: Put all the resources(images, sounds) of the app inside this folder.
- `babel.config.js`: Babel configuration file.
- `main.ts`: Main entry file of the app. The name of this file should not be changed.
- `package.json`: Package.json file.
- `tsconfig.json`: TypeScript configuration file.
- `yarn.lock`: Yarn lock file.

## Usage

### Build the project

You need to build the project before you can archive your project.

```bash
yarn build
```

### Archive the project

Archive the project by running the following command. You can upload the generated project archive in the [ZEP desktop website](https://zep.us/me/apps/).

```bash
yarn archive
```

### Publish the app 

Publish your app by running the following command. You have to fill in configuration file(`zep-script.json`) before running this command.

```bash
yarn publish
```

#### `zep-script.json`

- `appId`: The app id of the app. Leave it empty if you want to publish a new app. Setting this property will update the app already uploaded.
- `name`: Name of the app.
- `description`: Description of the app.
- `type`: Type of the app. One of `normal`, `minigame`, `sidebar`

### ZEP Script API Documentation

- [English](https://docs.zep.us/zep-script)
- [Korean](https://docs-kr.zep.us/zep-script)
