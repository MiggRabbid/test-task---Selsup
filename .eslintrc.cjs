module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  "rules": {
    "no-unused-vars": "warn",
    "prettier/prettier": [
      "error", prettierConfig
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
    "react/jsx-filename-extension": [
      1,
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "no-case-declarations": "off",
    "react-hooks/exhaustive-deps": "warn",
    "no-shadow": ["warn"],
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/no-absolute-path": "error",

  }
}
