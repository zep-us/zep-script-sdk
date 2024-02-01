import axios from "axios";
import { prompt } from "enquirer";
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

  const { email } = await prompt<{ email: string }>({
    type: "input",
    name: "email",
    message: "Enter your email",
  });

  loader.start("Sending login code to your email...");

  const loginData = { email };

  await axios.post(`${BASE_URL}/api/v2/signin`, loginData);

  loader.succeed();

  const { code } = await prompt<{ code: string }>({
    type: "input",
    name: "code",
    message: "Enter code sent to your email",
  });

  const confirmData = {
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
