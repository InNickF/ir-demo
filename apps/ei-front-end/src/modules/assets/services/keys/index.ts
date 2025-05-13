import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { assetGrowthQueries } from "./asset-growth";
import { filtersQueries } from "./filters";
import { assetsFundsQueries } from "./funds";
import { investingPerformanceQueries } from "./investing-performance";
import { portfolioQueries } from "./portfolio";
import { portfolioGrowthQueries } from "./portfolio-growth";
import { propertiesQueries } from "./properties";
import { tenantsQueries } from "./tenants";

export const queries = mergeQueryKeys(
  tenantsQueries,
  propertiesQueries,
  portfolioQueries,
  assetGrowthQueries,
  filtersQueries,
  portfolioGrowthQueries,
  investingPerformanceQueries,
  assetsFundsQueries
);
