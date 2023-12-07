import Archiver from "archiver";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import logger from "../../utils/logger";
import {
  isScriptBuildExists,
  isWidgetBuildExists,
} from "../../utils/fileCheckers";
import execa from "execa";

type Options = {
  projectRoot?: string;
};

async function archiveScript(root: string, archiver: Archiver.Archiver) {
  if (!isScriptBuildExists(root)) {
    logger.warn("Script build not found. Building script...");
    await execa("yarn", ["zep-script", "build"], {
      stdio: !logger.isVerbose() ? "pipe" : "inherit",
      cwd: root,
    });
  }
  const scriptBuildPath = path.join(root, "dist");
  archiver.directory(scriptBuildPath, false);
}

async function archiveResource(root: string, archiver: Archiver.Archiver) {
  const resDirPath = path.join(root, "res");
  archiver.directory(resDirPath, false);
}

async function archiveWidget(root: string, archiver: Archiver.Archiver) {
  if (isWidgetBuildExists(root)) {
    const widgetBuildPath = path.join(root, "widget/dist");
    archiver.directory(widgetBuildPath, "widget");
  }
}

export default (async function archive([]: Array<string>, options: Options) {
  const cwd = process.cwd();
  const root = options.projectRoot || cwd;

  const loader = ora();
  const archiver = Archiver("zip");

  try {
    loader.start("Analyzing project");

    const projectName = path.basename(root);

    loader.succeed();
    loader.start("Archiving project");

    const archiveOutputPath = path.join(cwd, `${projectName}.zepapp.zip`);
    const output = fs.createWriteStream(archiveOutputPath);
    output.on("close", function () {
      loader.succeed();

      logger.log(chalk.green(`Project ${projectName} archived successfully.`));

      process.exit(0);
    });
    output.on("error", function (err) {
      archiver.abort();
      loader.fail();
      logger.error(err.message);

      process.exit(1);
    });

    archiver.pipe(output);

    await archiveScript(root, archiver);
    await archiveResource(root, archiver);
    await archiveWidget(root, archiver);

    await archiver.finalize();
  } catch (e) {
    archiver.abort();
    loader.fail();
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
