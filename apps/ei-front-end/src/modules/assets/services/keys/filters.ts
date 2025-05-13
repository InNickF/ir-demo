import { createQueryKeys } from "@lukemorales/query-key-factory";

export const filtersQueries = createQueryKeys("filters", {
  legacyAssetGrowth: null,
  portfolioGrowth: null,
  portfolioSummary: null,
  propertySummary: null,
  assets: null,
  assetGrowth: null,
});
