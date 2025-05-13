/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const svgLoader = require("vite-svg-loader");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        svgLoader({
          defaultImport: "raw",
        }),
      ],
    };
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // https://github.com/storybookjs/storybook/issues/12185
      propFilter: (prop) => true,
    },
  },
};
