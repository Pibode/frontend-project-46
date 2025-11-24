import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    ignores: ['**/node_modules/', '**/dist/'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
    },
  },
]
