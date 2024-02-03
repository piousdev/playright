module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // error if not using hooks correctly
    "react/react-in-jsx-scope": "off",
    // to allow only named exports with no default export
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    "react-hooks/rules-of-hooks": "error",
    // to allow only named exports with no default export
    "import/no-named-as-default": "off",
    "eslint-plugin-import/prefer-default-export": "off",
    // to avoid import errors with nx
    "import/no-unresolved": "off",
    "import/no-extraneous": "off",
    "import/extensions": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
