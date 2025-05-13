import { defineConfig } from "cypress";
import { defaultUIBaseUrlEndToEnd } from "./cypress/utils";

const baseUrlEndToEnd =
  process.env.CYPRESS_UI_BASE_URL || defaultUIBaseUrlEndToEnd;

export default defineConfig({
  e2e: {
    baseUrl: baseUrlEndToEnd,
  },
});
