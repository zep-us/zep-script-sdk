import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["./src/**/*.ts", "./main.ts"],
    ...pluginJs.configs.recommended,
  },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["./src/**/*.ts", "./main.ts"],
  })),
  {
    files: ["./src/**/*.ts", "./main.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      'no-empty': ['error', { 'allowEmptyCatch': true }],

      'no-restricted-globals': [
        'error',
        {
          name: 'console',
          message: 'console is not available in ZEP-SCRIPT project. Please use proper logging library instead. | console는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'window',
          message: 'window object is not available in ZEP-SCRIPT project. | window 객체는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'document',
          message: 'document object is not available in ZEP-SCRIPT project. | document 객체는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'localStorage',
          message: 'localStorage is not available in ZEP-SCRIPT project. | localStorage는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'sessionStorage',
          message: 'sessionStorage is not available in ZEP-SCRIPT project. | sessionStorage는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'fetch',
          message: 'fetch API is not available in ZEP-SCRIPT project. | fetch API는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'XMLHttpRequest',
          message: 'XMLHttpRequest is not available in ZEP-SCRIPT project. | XMLHttpRequest는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          name: 'Map',
          message: 'Map is not available in ZEP-SCRIPT project. | Map는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        }
      ],

      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          message: 'Node.js process object is not available in ZEP-SCRIPT project. | Node.js process 객체는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
        {
          object: 'global',
          message: 'Node.js global object is not available in ZEP-SCRIPT project. | Node.js global 객체는 ZEP-SCRIPT 프로젝트에서 사용할 수 없습니다.'
        },
      ],
    },
  },
];
