module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  extends: ["expo", "prettier", "plugin:drizzle/recommended"],
  plugins: ["prettier", "drizzle"],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["/dist/*"],
  overrides: [
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
