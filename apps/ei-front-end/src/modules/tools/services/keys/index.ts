import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { filtersQueries } from "./filters";
import { propertyLevelValidationQueries } from "./property-level-validations";

export const queries = mergeQueryKeys(
  filtersQueries,
  propertyLevelValidationQueries
);
