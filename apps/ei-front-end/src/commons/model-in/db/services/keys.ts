import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";
import { getConfigs, GetConfigParams } from "./api";

const configQueries = createQueryKeys("config", {
  configurations: (params: GetConfigParams) => ({
    queryKey: [params.filters],
    queryFn: () => getConfigs(params),
  }),
});

export const queries = mergeQueryKeys(configQueries);
