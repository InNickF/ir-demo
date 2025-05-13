import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { investorQueries } from "./investor";

export const queries = mergeQueryKeys(investorQueries);
