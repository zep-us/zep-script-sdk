import react from '@vitejs/plugin-react-swc'
import type {Plugin,UserConfig} from 'vite'
import path from "path";
import fs from "fs-extra";

const zepScriptPlugin = (): Plugin => ({
  name: 'mutate-config',
  config(config) {
    const configJsonPath = path.join(process.cwd(), "zep-script.json");
    const zepScriptConfig = JSON.parse(
      fs.readFileSync(configJsonPath).toString()
    );
    const pluginConfig: UserConfig = {
      plugins: [...(config.plugins || []), react()],
      root: 'widget',
      publicDir: false,
      build: {
        ...config.build,
        cssCodeSplit: false,
      },
      experimental: {
        ...config.experimental,
        renderBuiltUrl(filename) {
          if (filename.startsWith('/')) {
            filename = filename.substring(1);
          }
          filename = `/spaces/app/file?appHashId=${zepScriptConfig.appId}&fileName=widget/${filename}`;
          return filename;
        }
      }
    }
    Object.assign(config, pluginConfig);
  },
});

export default zepScriptPlugin;
