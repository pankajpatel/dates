module.exports = {
  extends: ["eslint-config-prettier", "plugin:storybook/recommended"],
  env: {
    browser: true,
  },
  rules: {
    allowAfterThis: true,
  },
};
