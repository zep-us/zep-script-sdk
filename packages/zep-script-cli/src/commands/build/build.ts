import chalk from "chalk";
import execa from "execa";
import ora from "ora";
import path from "path";
import logger from "../../utils/logger";
import {getScriptLanguage, isWidgetDirExists} from "../../utils/fileCheckers";

type Options = {
  projectRoot?: string;
};

async function buildWidget(root: string) {
  await execa(
    "tsc",
    [],
    {
      stdio: !logger.isVerbose() ? "pipe" : "inherit",
      cwd: root,
    }
  );
  await execa(
    "vite",
    ["build"],
    {
      stdio: !logger.isVerbose() ? "pipe" : "inherit",
      cwd: root,
    }
  );
}

async function buildScript(root: string) {
  await execa(
    "npx",
    ["rollup", "--config", "node:@zep.us/rollup-config-zep-script", "--bundleConfigAsCjs"],
    {
      stdio: !logger.isVerbose() ? "pipe" : "inherit",
      cwd: root,
    }
  );
}

export default (async function build([]: Array<string>, options: Options) {
  const cwd = process.cwd();
  const root = options.projectRoot || cwd;

  const loader = ora();

  try {
    loader.start("Analyzing project");

    const projectName = path.basename(root);
    const projectLanguage = getScriptLanguage(root);
    const hasWidget = isWidgetDirExists(root);

    loader.succeed();

    if (hasWidget){
      loader.start("Building widget");

      await buildWidget(root);

      loader.succeed();
    }

    loader.start("Building project");

    await buildScript(root);

    loader.succeed();

    logger.log(chalk.green(`Project ${projectName} built successfully.`));
  } catch (e) {
    loader.fail();
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
