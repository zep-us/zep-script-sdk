import axios, { AxiosError } from "axios";
import FormData from "form-data";
import fs from "fs-extra";
import ora from "ora";
import os from "os";
import path from "path";
import logger from "../../utils/logger";
import execa from "execa";
import chalk from "chalk";

type Options = {
  projectRoot?: string;
};

async function findArchiveFile(root: string) {
  const archiveFiles = fs
    .readdirSync(root)
    .filter((file) => file.endsWith(".zepapp.zip"));

  if (archiveFiles.length === 0) {
    throw new Error("No archive file found.");
  }

  return archiveFiles[0];
}

export default (async function publish([]: Array<string>, options: Options) {
  const cwd = process.cwd();
  const root = options.projectRoot || cwd;
  const BASE_URL = process.env.BASE_URL || "https://zep.us";

  const loader = ora();

  try {
    const configJsonPath = path.join(root, "zep-script.json");
    const configJsonObject = JSON.parse(
      fs.readFileSync(configJsonPath).toString()
    );

    const sessionFilePath = path.join(os.homedir(), ".zscsession");

    if (!fs.existsSync(sessionFilePath)) {
      throw new Error(
        "You are not logged in to ZEP. Run `zep-script login` first."
      );
    }

    const loginToken = (await fs.readFile(sessionFilePath)).toString();

    const archiveFileName = await findArchiveFile(root);
    const archiveFilePath = path.join(root, archiveFileName);
    const archiveFile = fs.createReadStream(archiveFilePath);

    const formData = new FormData();
    formData.append("file", archiveFile, archiveFileName);
    formData.append("name", configJsonObject.name);
    formData.append("description", configJsonObject.description);
    if (configJsonObject.appId) {
      formData.append("appHashId", configJsonObject.appId);
    }

    let type = "1";
    switch (configJsonObject.type) {
      case "minigame":
        type = "2";
        break;
      case "sidebar":
        type = "3";
    }
    formData.append("type", type);

    loader.start(`Publishing ${configJsonObject.name}...`);

    const method = configJsonObject.appId ? "put" : "post";
    const {
      data: { data },
    } = await axios[method](`${BASE_URL}/api/v2/me/apps`, formData, {
      headers: {
        "X-Token": loginToken,
        ...formData.getHeaders(),
      },
    });
    if (configJsonObject.appId !== data.hashId) {
      configJsonObject.appId = data.hashId;

      await fs.writeFile(
        configJsonPath,
        JSON.stringify(configJsonObject, null, 4)
      );

      await execa("zep-script", ["build"]);
      await publish([], options);
    }

    loader.succeed();
    logger.log(chalk.green(`${configJsonObject.name} published successfully.`));
  } catch (e) {
    loader.fail();
    if (e instanceof AxiosError) {
      const statusCode = e.response?.status;
      if (statusCode === 401 || statusCode === 403) {
        logger.error(
          "You are not logged in to ZEP. Run `zep-script login` first."
        );
      } else {
        logger.error(e.message);
      }
    } else if (e instanceof Error) {
      logger.error(e.message);
    }
    process.exit(1);
  }
});
