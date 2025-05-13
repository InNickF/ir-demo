import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getFundsKPIs } from "../api/funds";

export const fundsQueries = createQueryKeys("funds", {
  kpis: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getFundsKPIs(filters),
  }),
});
