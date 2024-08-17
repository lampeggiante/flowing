import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'

export default [
  { files: ['./packages/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['**/node_modules/**', '**/dist/**', '**/assets/**'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-empty-function': 'off',
      'no-async-promise-executor': 'off',
      quotes: ['error', 'single'],
      'prefer-destructuring': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // 'array-bracket-spacing': ['error', 'always'], // 数组前后留空格
      'object-curly-spacing': ['error', 'always'], // 对象前后留空格
      semi: ['error', 'never'], // ;分号省略
      'comma-dangle': ['error', 'never'], // ,逗号省略
      // "simple-import-sort/imports": "error",
      // "simple-import-sort/exports": "error",
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-this-alias': 'warn'
    }
  }
]
