import chalk from "chalk";
import execa from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import logger from "../../tools/logger";

type Options = {
  projectRoot?: string;
};

function checkMainFile(root: string) {
  let mainFilePath = path.join(root, "src/index.ts");
  if (fs.existsSync(mainFilePath)) {
    return "typescript";
  }
  mainFilePath = path.join(root, "src/index.js");
  if (fs.existsSync(mainFilePath)) {
    return "javascript";
  }
  throw new Error("No entry source file found. Tried to find index.ts or index.js in src folder.");
}

export default (async function archive([]: Array<string>, options: Options) {
  const cwd = process.cwd();
  const root = options.projectRoot || cwd;

  const loader = ora();

  try {
    loader.start("Analyzing project");

    const projectName = path.basename(root);
    const projectLanguage = checkMainFile(root);

    loader.succeed();
    loader.start("Building project");

    await execa(
      "npx",
      ["rollup", "--config", "node:@zep.us/rollup-config-zep-script", "--bundleConfigAsCjs"],
      {
        stdio: !logger.isVerbose() ? "pipe" : "inherit",
        cwd: root,
      }
    );

    loader.succeed();

    logger.log(chalk.green(`Project ${projectName} built successfully.`));
  } catch (e) {
    loader.fail();
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
