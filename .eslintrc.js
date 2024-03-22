
const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript')
  ],
  rules: {
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-default-export": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};