const prettierConfig = require('./prettier.config.cjs');

module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:prettier/recommended",
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs', 'prettier.config.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  },
  globals: {
    "NodeJS": true
  },
  plugins: ['react-refresh', "@typescript-eslint",
    "prettier",],
  "rules": {
    "no-unused-vars": "warn",
    "prettier/prettier": [
      "warn", prettierConfig
    ],
    "react/prop-types": 0,
    "no-console": 0,
    "no-extra-boolean-cast": 0,
    "react/react-in-jsx-scope": 0,
    "functional/no-conditional-statement": 0,
    "functional/no-expression-statement": 0,
    "functional/immutable-data": 0,
    "functional/functional-parameters": 0,
    "functional/no-try-statement": 0,
    "functional/no-throw-statement": 0,
    "no-underscore-dangle": [2, { "allow": ["__filename", "__dirname"] }],
    "testing-library/no-debug": 0,
    "no-case-declarations": "off",
    "react-hooks/exhaustive-deps": "warn",
    "no-shadow": ["warn"],

  }
}
