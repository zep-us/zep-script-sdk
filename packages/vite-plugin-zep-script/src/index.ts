import react from "@vitejs/plugin-react-swc";
import type { Plugin, UserConfig } from "vite";
import path from "path";
import fs from "fs-extra";

const zepScriptPlugin = (): Plugin => ({
  name: "zep-script",
  config(config) {
    const root = config.root ?? process.cwd();
    const widgetPath = path.join(root, "widget");
    const configJsonPath =
      process.env.ZEP_SCRIPT_CONFIG_PATH || path.join(root, "zep-script.json");
    const zepScriptConfig = JSON.parse(
      fs.readFileSync(configJsonPath).toString()
    );
    const pluginConfig: UserConfig = {
      base: `/app/${zepScriptConfig.appId}/widget`,
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
