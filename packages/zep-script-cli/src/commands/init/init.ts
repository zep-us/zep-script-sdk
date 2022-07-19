import chalk from "chalk";
import clear from "clear";
import execa from "execa";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";
import banner from "../../tools/banner";
import logger from "../../tools/logger";

type Options = {
  npm?: boolean;
  directory?: string;
  skipInstall?: boolean;
};

interface TemplateOptions {
  projectName: string;
  npm?: boolean;
  directory: string;
  skipInstall?: boolean;
}

async function createProjectDirectory(directory: string) {
  logger.debug(`Creating project directory`);

  if (fs.existsSync(directory)) {
    throw new Error(
      `Cannot initialize new project because directory "${directory}" already exists.`
    );
  }

  try {
    fs.mkdirSync(directory, { recursive: true });
  } catch (error) {
    throw new Error("Error occurred while trying to create project directory.");
  }

  return directory;
}

async function installTemplate({
  npm,
  root,
  name,
}: {
  npm?: boolean;
  root: string;
  name: string;
}) {
  logger.debug(`Installing template to ${root}`);

  const packageManager = npm ? "npm" : "yarn";
  await execa(packageManager, ["init", "--yes"], {
    stdio: !logger.isVerbose() ? "pipe" : "inherit",
    cwd: root,
  });
  await execa(packageManager, ["add", name], {
    stdio: !logger.isVerbose() ? "pipe" : "inherit",
    cwd: root,
  });
}

async function copyTemplate(templatePath: string, projectRoot: string) {
  logger.debug(`Copying template from ${templatePath}`);

  await fs.copy(templatePath, projectRoot, {
    filter: (path) =>
      !path.includes("zep-script-template/node_modules") &&
      !path.includes("zep-script-template/dist"),
  });
}

async function renameProjectName(projectRoot: string, projectName: string) {
  logger.debug(`Renaming project in ${projectRoot} to ${projectName}`);

  const packageJson = path.join(projectRoot, "package.json");
  const packageJsonObject = JSON.parse(fs.readFileSync(packageJson).toString());
  packageJsonObject.name = projectName;
  delete packageJsonObject.publishConfig;
  delete packageJsonObject.files;
  delete packageJsonObject.gitHead;
  fs.writeFileSync(packageJson, JSON.stringify(packageJsonObject, null, 2));
}

async function installDependencies({
  npm,
  root,
}: {
  npm?: boolean;
  root: string;
}) {
  logger.debug(`Installing dependencies in ${root}`);

  const packageManager = npm ? "npm" : "yarn";
  await execa(packageManager, ["install"], {
    stdio: !logger.isVerbose() ? "pipe" : "inherit",
    cwd: root,
  });
}

async function createFromTemplate({
  projectName,
  npm,
  directory,
  skipInstall,
}: TemplateOptions) {
  logger.debug("Initializing new project");
  logger.log(banner);

  const loader = ora();

  const projectDir = await createProjectDirectory(directory);
  const templateSourceDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "zep-script-cli-init")
  );

  try {
    loader.start("Downloading template");

    const templateName = "@zep.us/zep-script-template";
    await installTemplate({ npm, root: templateSourceDir, name: templateName });

    loader.succeed();
    loader.start("Copying template");

    const templatePath = path.resolve(
      templateSourceDir,
      "node_modules",
      templateName
    );
    await copyTemplate(templatePath, projectDir);

    loader.succeed();
    loader.start("Processing template");

    await renameProjectName(projectDir, projectName);

    loader.succeed();

    if (!skipInstall) {
      loader.start("Installing dependencies");

      await installDependencies({ npm, root: projectDir });

      loader.succeed();
    } else {
      loader.succeed("Dependencies installation skipped");
    }
    logger.log(chalk.green(`Project ${projectName} initialized successfully.`));
  } catch (e) {
    loader.fail();
    throw e;
  } finally {
    fs.removeSync(templateSourceDir);
  }
}

function validateProjectName(name: string) {
  const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i;
  const reservedNames = ["zep-script"];

  if (!String(name).match(NAME_REGEX)) {
    throw new Error(
      `"${name}" is not a valid name for a project. Please use a valid identifier name (alphanumeric).`
    );
  }

  const lowerCaseName = name.toLowerCase();
  if (reservedNames.includes(lowerCaseName)) {
    throw new Error(
      `Not a valid name for a project. Please do not use the reserved word "${lowerCaseName}".`
    );
  }
}

export default (async function initialize(
  [projectName]: Array<string>,
  options: Options
) {
  clear();

  const root = process.cwd();

  validateProjectName(projectName);

  const directory = path.relative(root, options.directory || projectName);

  try {
    await createFromTemplate({
      projectName,
      directory,
      npm: options.npm,
      skipInstall: options.skipInstall,
    });
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
