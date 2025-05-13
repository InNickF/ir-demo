// eslint-disable-next-line @typescript-eslint/no-var-requires
const inUIConfig = require("in-ui-tailwind-config");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  ...inUIConfig,
};
