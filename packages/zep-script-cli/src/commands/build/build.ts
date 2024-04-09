import Archiver from "archiver";
import chalk from "chalk";
import execa from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import logger from "../../utils/logger";
import {
  isLegacyScriptBuildExists,
  isScriptBuildExists,
  isViteConfigExists,
  isWidgetBuildExists,
  isWidgetDirExists,
} from "../../utils/fileCheckers";

type Options = {
  projectRoot?: string;
  outputPath?: string;
  config?: string;
  legacy?: boolean;
};

async function buildWidget(root: string) {
  if (isViteConfigExists(root)) {
    await execa("npx", ["vite", "build"], {
      stdio: !logger.isVerbose() ? "pipe" : "inherit",
      cwd: root,
    });
  }
}

async function buildScript(root: string) {
  await execa(
    "npx",
    [
      "rollup",
      "--config",
      "node:@zep.us/rollup-config-zep-script",
      "--bundleConfigAsCjs",
    ],
    {
      stdio: !logger.isVerbose() ? "pipe" : "inherit",
      cwd: root,
    }
  );
}

async function archiveScript(root: string, archiver: Archiver.Archiver) {
  if (!isScriptBuildExists(root)) {
    throw new Error("Script build not found.");
  }
  const scriptBuildPath = path.join(root, "dist");
  archiver.directory(scriptBuildPath, false);
}

async function archiveLegacyApp(root: string, archiveFileName: string, archiver: Archiver.Archiver) {
  if (!isLegacyScriptBuildExists(root)) {
    throw new Error("Script(main.js) not found.");
  }

  const ignoreStrings = [`**/${archiveFileName}`, 'zep-script.json', 'project.json'];
  archiver.glob('**/*', { cwd: root, ignore: ignoreStrings});
}

async function archiveResource(root: string, archiver: Archiver.Archiver) {
  const resDirPath = path.join(root, "res");
  archiver.directory(resDirPath, false);
}

async function archiveWidget(root: string, archiver: Archiver.Archiver) {
  if (isWidgetBuildExists(root)) {
    const widgetBuildPath = path.join(root, "zep-script-widget/dist");
    archiver.directory(widgetBuildPath, "zep-script-widget");
  }
}

export default (async function build([]: Array<string>, options: Options) {
  const cwd = process.cwd();
  const root = options.projectRoot || cwd;
  const outputPath = options.outputPath || cwd;
  const configPath = options.config || path.join(root, "zep-script.json");
  const isLegacyBuild = options.legacy || false;

  process.env.ZEP_SCRIPT_CONFIG_PATH = configPath;

  const loader = ora();
  const archiver = Archiver("zip");

  try {
    const projectName = path.basename(root);
    const hasWidget = isWidgetDirExists(root);

    if (!isLegacyBuild) {
      if (hasWidget) {
        loader.start("Building widget");
        await buildWidget(root);
        loader.succeed();
      }

      loader.start("Building project");
      await buildScript(root);
      loader.succeed();
    }

    loader.start("Archiving project!!!!!!!!!");

    const archiveFileName = `${projectName}.zepapp.zip`;
    const archiveOutputPath = path.join(
      isLegacyBuild ? root : outputPath,
      archiveFileName
    );
    const output = fs.createWriteStream(archiveOutputPath);
    output.on("close", function () {
      loader.succeed();

      logger.log(chalk.green(`Project ${projectName} built successfully.`));

      process.exit(0);
    });
    output.on("error", function (err) {
      archiver.abort();
      loader.fail();
      logger.error(err.message);

      process.exit(1);
    });

    archiver.pipe(output);

    if (isLegacyBuild) {
      await archiveLegacyApp(root, archiveFileName, archiver);
    } else {
      await archiveScript(root, archiver);
      await archiveResource(root, archiver);
      await archiveWidget(root, archiver);
    }

    await archiver.finalize();
  } catch (e) {
    archiver.abort();
    loader.fail();
    if (e instanceof Error) {
      logger.error(e.message);
    }
    process.exit(1);
  }
});
