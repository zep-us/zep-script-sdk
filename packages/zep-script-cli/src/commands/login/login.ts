import axios from "axios";
import prompt from "prompt";
import fs from "fs-extra";
import ora, { Ora } from "ora";
import os from "os";
import path from "path";
import logger from "../../utils/logger";

type Options = {
  projectRoot?: string;
};

async function auth(loader: Ora, sessionFilePath: string) {
  await fs.remove(sessionFilePath);

  const BASE_URL = process.env.BASE_URL || "https://zep.us";

  prompt.start();

  const { email } = await prompt.get({
    name: "email",
    description: "Enter your email",
    type: "string",
    required: true,
  });

  loader.start("Sending login code to your email...");

  const loginData = { email };

  await axios.post(`${BASE_URL}/api/v2/signin`, loginData);

  loader.succeed();

  const { code } = await prompt.get({
    name: "code",
    description: "Enter code sent to your email",
    type: "string",
    required: true,
  });

  const confirmData: any = {
    email,
    t: code,
    isApp: false,
  };

  loader.start("Authenticating...");

  const { data } = await axios.post(
    `${BASE_URL}/api/v2/signin/confirm`,
    confirmData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const loginToken = data.loginToken;
  await fs.writeFile(sessionFilePath, loginToken);

  loader.succeed();
}

export default (async function login([]: Array<string>, options: Options) {
  const loader = ora();

  try {
    const sessionFilePath = path.join(os.homedir(), ".zscsession");

    await auth(loader, sessionFilePath);
  } catch (e) {
    loader.fail();
    if (e instanceof Error) {
      logger.error(e.message);
    }
  }
});
