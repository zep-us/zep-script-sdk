// @ts-check
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/main.js`,
      format: 'cjs',
      strict: true,
      sourcemap: true,
      plugins: [terser()],
    }
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    nodeResolve(),
    typescript({ 
      tsconfig: './tsconfig.zep.json', 
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
        }
      }
    }),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      plugins: ['@zep.us/zep-script'],
      presets: ['@babel/preset-env'],
      extensions: ['.js', '.ts', '.mjs'],
    }),
    filesize(),
  ],
};
