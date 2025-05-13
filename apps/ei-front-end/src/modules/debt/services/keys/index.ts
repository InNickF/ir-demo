import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { propertiesQueries } from "./properties";
import { filtersQueries } from "./filters";
import { fundQueries } from "./fund";
import { loansQueries } from "./loans";
import { overviewQueries } from "./overview";

export const queries = mergeQueryKeys(
  propertiesQueries,
  filtersQueries,
  fundQueries,
  loansQueries,
  overviewQueries
);
