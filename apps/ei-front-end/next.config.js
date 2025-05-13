const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    /**
     * Disabling css modules
     * Read more here: https://nanxiaobei.medium.com/disable-css-modules-in-next-js-project-756835172b6e
     */
    config.module.rules[2]?.oneOf?.forEach((one) => {
      if (!`${one.issuer?.and}`.includes("_app")) return;
      one.issuer.and = [path.resolve(__dirname)];
    });
    return config;
  },
};
