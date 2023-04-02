import Archiver from "archiver";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import logger from "../../utils/logger";
import {getScriptLanguage, isScriptBuildExists, isWidgetBuildExists} from "../../utils/fileCheckers";
import execa from "execa";

type Options = {
  projectRoot?: string;
};

async function archiveScript(root: string, archive: Archiver.Archiver) {
  if (!isScriptBuildExists(root)) {
    logger.warn("Script build not found. Building script...");
    await execa(
      "yarn",
      ["zep-script", "build"],
      {
        stdio: !logger.isVerbose() ? "pipe" : "inherit",
        cwd: root,
      }
    );
  }
  const scriptBuildPath = path.join(root, "dist");
  archive.directory(scriptBuildPath, false);
}

async function archiveResource(root: string, archive: Archiver.Archiver) {
  const resDirPath = path.join(root, "res");
  archive.directory(resDirPath, false);
}

async function archiveWidget(root: string, archive: Archiver.Archiver) {
  if (isWidgetBuildExists(root)) {
    const widgetBuildPath = path.join(root, "widget/dist");
    archive.directory(widgetBuildPath, "widget");
  }
}

export default (async function archive([]: Array<string>, options: Options) {
  const cwd = process.cwd();
  const root = options.projectRoot || cwd;

  const loader = ora();
  const archive = Archiver("zip");

  try {
    loader.start("Analyzing project");

    const projectName = path.basename(root);
    const projectLanguage = getScriptLanguage(root);

    loader.succeed();
    loader.start("Archiving project");

    const archiveOutputPath = path.join(cwd, `${projectName}.zepapp.zip`);
    const output = fs.createWriteStream(archiveOutputPath);
    output.on("close", function () {
      loader.succeed();

      logger.log(chalk.green(`Project ${projectName} archived successfully.`));
    });
    output.on("error", function (err) {
      archive.abort();
      loader.fail();
      logger.error(err.message);
    });

    archive.pipe(output);

    await archiveScript(root, archive);
    await archiveResource(root, archive);
    await archiveWidget(root, archive);

    await archive.finalize();
  } catch (e) {
    archive.abort();
    loader.fail();
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
