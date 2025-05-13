import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { dealsQueries } from "./deals";
import { filtersQueries } from "./filters";
import { fundsQueries } from "./funds";
import { marketAnalyticsQueries } from "./market-analytics";

export const queries = mergeQueryKeys(
  dealsQueries,
  fundsQueries,
  filtersQueries,
  marketAnalyticsQueries
);
