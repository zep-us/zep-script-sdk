# ZEP Script CLI

Command line interface for ZEP Script.

> This package is bundled with [zep-script](https://www.npmjs.com/package/zep-script) package, so you generally won't install this package directly.

## Usage

Run script via [npx](https://docs.npmjs.com/cli/v8/commands/npx)

```bash
npx zep-script init MyZepApp
```

## Commands

- [`init`](#init)
- [`build`](#build)
- [`archive`](#archive)

### `init`

Initialize a new ZEP Script project named `<projectName>` in a directory of the same name.

#### Usage

```bash
# zep-script init [options] <projectName>
npx zep-script init MyZepApp
```

#### Options
##### `--npm`

By default, cli uses Yarn to install dependencies. With this flag, cli forces using npm instead of yarn for initialization.

##### `--directory <string>`

Use this option to use a custom directory instead of `<projectName>`.

##### `--skip-install`

Use this flag to skip dependencies installation step.


### `build`

Build project to be ready for archived.

#### Usage

```bash
# zep-script build [options]
npx zep-script build
```

#### Options
  
##### `--projectRoot <string>`

Use this option to sets root directory of project to be built instead of cli's current working directory.

### `archive`

Archive ZEP Script project to be ready for uploading. Project must have been built first before executing this command.

#### Usage

```bash
# zep-script build [options]
npx zep-script archive
```

#### Options
  
##### `--projectRoot <string>`

Use this option to sets root directory of project to be archived instead of cli's current working directory.
