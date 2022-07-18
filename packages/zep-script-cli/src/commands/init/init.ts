import execa from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import banner from "../../banner";
import logger from "../../logger";

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

function doesDirectoryExist(dir: string) {
  return fs.existsSync(dir);
}

async function setProjectDirectory(directory: string) {
  if (doesDirectoryExist(directory)) {
    throw new Error(
      `Cannot initialize new project because directory "${directory}" already exists.`
    );
  }

  try {
    fs.mkdirSync(directory, { recursive: true });
    process.chdir(directory);
  } catch (error) {
    throw new Error("Error occurred while trying to create project directory.");
  }

  return process.cwd();
}

export async function copyTemplate(templatePath: string) {
  logger.debug(`Copying template from ${templatePath}`);

  await fs.copy(templatePath, process.cwd(), {
    filter: (path) =>
      !path.includes("node_modules") &&
      !path.includes("dist") &&
      !path.includes("zep-script.json"), // ignoring zep-script.json because we doesn't support deploying ZEP app through CLI yet.
  });
}

async function installDependencies({
  npm,
  root,
}: {
  npm?: boolean;
  root: string;
}) {
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

  const projectDirectory = await setProjectDirectory(directory);

  try {
    loader.start("Copying template");

    const templatePath = path.join(__dirname, "../../../template");

    await copyTemplate(templatePath);

    loader.succeed();
    loader.start("Processing template");

    const packageJson = path.join(process.cwd(), "package.json");
    const packageJsonObject = JSON.parse(
      fs.readFileSync(packageJson).toString()
    );
    packageJsonObject.name = projectName;
    fs.writeFileSync(packageJson, JSON.stringify(packageJsonObject, null, 2));

    loader.succeed();

    if (!skipInstall) {
      loader.start("Installing dependencies");

      await installDependencies({
        npm,
        root: projectDirectory,
      });

      loader.succeed();
    } else {
      loader.succeed("Dependencies installation skipped");
    }
  } catch (e) {
    loader.fail();
    throw e;
  }
}

function validateProjectName(name: string) {
  const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i;
  const reservedNames = ["react", "react-native"];

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
