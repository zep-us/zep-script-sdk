import archiver from "archiver";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import logger from "../../logger";

type Options = {
  projectRoot?: string;
};

function checkMainFile(root: string) {
  let mainFilePath = path.join(root, "main.ts");
  if (fs.existsSync(mainFilePath)) {
    const distDirPath = path.join(root, "dist/");
    if (fs.existsSync(distDirPath)) {
      return "typescript";
    } else {
      throw new Error(
        "TypeScript project doesn't seem to be built. Please run `zep-script build` first."
      );
    }
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

  try {
    // const configJsonPath = path.join(root, "zep-script.json");
    // const configJsonObject = JSON.parse(
    //   fs.readFileSync(configJsonPath).toString()
    // );

    const loader = ora();

    loader.start("Analyzing project");

    const projectName = path.basename(root);
    const projectLanguage = checkMainFile(root);

    loader.succeed();
    loader.start("Archiving project");

    const archiveOutputPath = path.join(cwd, `${projectName}.zip`);
    const output = fs.createWriteStream(archiveOutputPath);
    const archive = archiver("zip");
    archive.pipe(output);

    if (projectLanguage === "typescript") {
      const distDirPath = path.join(root, "dist/");
      archive.directory(distDirPath, false);
    } else {
      archive.glob("**/*.js", { cwd: root });
    }

    const resDirPath = path.join(root, "res/");
    archive.directory(resDirPath, false);

    archive.finalize();

    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      loader.succeed();
    });
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
