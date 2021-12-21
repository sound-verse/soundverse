module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  ignorePatterns: [
    "newrelic.js",
    "*spec.ts",
    "*spec.js",
    "**/__tests__/*",
    "*.fixtures.ts",
    "*.d.ts",
  ],
  rules: {
    // Disabled because adding a return type to all functions would require a lot of work
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Warn about unused vars except for when prefixed with _
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // TODO: Should re-enable later
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
  },
};
