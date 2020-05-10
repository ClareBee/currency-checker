module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    quotes: [2, "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": [1, { allow: "single-child" }],
    "react/forbid-prop-types": [0],
  },
};
