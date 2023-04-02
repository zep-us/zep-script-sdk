// @ts-check
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import del from 'rollup-plugin-delete';

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
    nodeResolve({ browser: true, preferBuiltins: false }),
    typescript({ tsconfig: './tsconfig.json' }),
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
