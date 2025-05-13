import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getFundLenders,
  getFundKpis,
  getFundMaturityLenders,
  getFundLendersByLtv,
  getFundOutstandingBalanceByLenders,
} from "../api/fund";

export const fundQueries = createQueryKeys("fund", {
  kpis: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getFundKpis(filters),
  }),
  lenders: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getFundLenders(filters),
  }),
  maturityLenders: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getFundMaturityLenders(filters),
  }),
  lendersByLtv: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getFundLendersByLtv(filters),
  }),
  outstandingBalanceByLenders: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getFundOutstandingBalanceByLenders(filters),
  }),
});
