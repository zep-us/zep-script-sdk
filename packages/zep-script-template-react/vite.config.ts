import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import zepScriptConfig from './zep-script.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './widget',
  publicDir: false,
  build: {
    cssCodeSplit: false,
  },
  experimental: {
    renderBuiltUrl(filename: string) {
      if (filename.startsWith('/')) {
        filename = filename.substring(1);
      }
      filename = `/spaces/app/file?appHashId=${zepScriptConfig.appId}&fileName=widget/${filename}`;
      return filename;
    }
  }
});
