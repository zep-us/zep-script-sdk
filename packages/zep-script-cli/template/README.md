# ZEP Script App Template

## Directory Structure

```
📦Project Root
 ┣ 📂res
 ┣ babel.config.js
 ┣ main.ts
 ┣ package.json
 ┣ tsconfig.json
 ┣ zep-script.json
 ┗ yarn.lock
```

- `📂res`: Put all the resources(images, sounds) of the app inside this folder.
- `babel.config.js`: Babel configuration file.
- `main.ts`: Main entry file of the app. The name of this file should not be changed.
- `package.json`: Package.json file.
- `tsconfig.json`: TypeScript configuration file.
- `zep-script.json`: ZEP Script configuration file.
- `yarn.lock`: Yarn lock file.

## Usage

### Configuration File

All configurations of your ZEP app is located inside `zep-script.json`.

#### `name`

Name of your app.

#### `description`

Description of your app.

#### `type`

Type of your app. ZEP app has two types: `Normal` and `Installable`.

#### `iconFilePath`

Path to the icon file of your app relative to the config file.
