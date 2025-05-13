import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  GetDebtLoanCapMappings,
  getDebtLoanCapMappings,
  getDebtLoanCovenantTesting,
  getDebtLoanReporting,
  getDebtLoanRoom,
  getDebtLoanSummary,
  getDebtLoanTimeline,
  getDebtLoans,
} from "../api/loans";

export const loansQueries = createQueryKeys("loans", {
  debtLoans: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDebtLoans(filters),
  }),
  debtLoanSummary: ({ id }: { id: string }) => ({
    queryKey: [id],
    queryFn: () => getDebtLoanSummary({ id }),
  }),
  debtLoanCovenantTesting: ({ id }: { id: string }) => ({
    queryKey: [id],
    queryFn: () => getDebtLoanCovenantTesting({ id }),
  }),
  debtLoanReporting: ({ id }: { id: string }) => ({
    queryKey: [id],
    queryFn: () => getDebtLoanReporting({ id }),
  }),
  debtLoanTimeline: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDebtLoanTimeline({ filters }),
  }),
  debtLoanRoom: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDebtLoanRoom({ filters }),
  }),
  debtLoanCapMappings: (filters: GetDebtLoanCapMappings) => ({
    queryKey: [filters],
    queryFn: () => getDebtLoanCapMappings(filters),
  }),
});
