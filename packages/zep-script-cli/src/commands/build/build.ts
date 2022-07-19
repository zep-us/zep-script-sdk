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
  let mainFilePath = path.join(root, "main.ts");
  if (fs.existsSync(mainFilePath)) {
    return "typescript";
  }
  mainFilePath = path.join(root, "main.js");
  if (fs.existsSync(mainFilePath)) {
    return "javascript";
  }
  throw new Error("No main file found.");
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

    if (projectLanguage === "typescript") {
      await execa("npx", ["tsc", "-p", ".", "--noEmit"], {
        stdio: !logger.isVerbose() ? "pipe" : "inherit",
        cwd: root,
      });
    }

    await execa(
      "npx",
      ["babel", "main.ts", "--out-dir", "dist", "--extensions", ".ts"],
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
