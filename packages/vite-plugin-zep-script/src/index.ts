import react from "@vitejs/plugin-react-swc";
import type { Plugin, UserConfig } from "vite";
import path from "path";
import fs from "fs-extra";

function getAppId(config: any) {
  if (typeof config.appId === "string") {
    return config.appId;
  } else if (typeof config.appId === "object") {
    const baseUrl = process.env.BASE_URL;
    let environment = "dev";
    if (baseUrl) {
      try {
        const url = new URL(baseUrl);
        if (url.hostname === "zep.us") {
          environment = "live";
        } else if (url.hostname.endsWith(".zep.us")) {
          environment = url.hostname.replace(".zep.us", "");
        } else {
          console.error("Invalid BASE_URL");
        }
      } catch (error) {
        console.error("Invalid BASE_URL");
      }
    }
    const appIdForEnvironment = config.appId[environment];
    if (typeof appIdForEnvironment !== "string") {
      throw new Error(`appId for environment ${environment} not found`);
    }
    return appIdForEnvironment;
  }
}

const zepScriptPlugin = (): Plugin => ({
  name: "zep-script",
  config(config) {
    const root = config.root ?? process.cwd();
    const widgetPath = path.join(root, "zep-script-widget");
    const configJsonPath = path.join(root, "zep-script.json");
    const zepScriptConfig = JSON.parse(
      fs.readFileSync(configJsonPath).toString()
    );
    const appId = getAppId(zepScriptConfig);
    const pluginConfig: UserConfig = {
      base: `/app/${appId}/zep-script-widget`,
      plugins: [...(config.plugins || []), react()],
      root: widgetPath,
      publicDir: false,
      build: {
        ...config.build,
        cssCodeSplit: false,
      },
    };
    Object.assign(config, pluginConfig);
  },
});

export default zepScriptPlugin;
