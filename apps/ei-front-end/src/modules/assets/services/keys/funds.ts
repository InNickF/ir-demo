import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getFund,
  getFundComments,
  GetFundCommentsFilters,
  getFundExitIRR,
  GetFundFilters,
  getFundGavBy,
  GetFundGavByFilters,
  getFundIRR,
  getFundLeaseExpiration,
  GetFundLeaseExpirationFilters,
  getFunds,
  GetFundsFilters,
  getFundStrategy,
  GetFundStrategyFilters,
  getFundTimeline,
  GetFundTimelineFilters,
} from "../api/funds";

export const assetsFundsQueries = createQueryKeys("funds", {
  all: (filters: GetFundsFilters) => ({
    queryKey: [filters],
    queryFn: () => getFunds(filters),
  }),
  fund: (filters: GetFundFilters) => ({
    queryKey: [filters],
    queryFn: () => getFund(filters),
  }),
  gavBy: (filters: GetFundGavByFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundGavBy(filters),
  }),
  leaseExpiration: (filters: GetFundLeaseExpirationFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundLeaseExpiration(filters),
  }),
  fundComments: (filters: GetFundCommentsFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundComments(filters),
  }),
  fundStrategy: (filters: GetFundStrategyFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundStrategy(filters),
  }),
  fundTimeline: (filters: GetFundTimelineFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundTimeline(filters),
  }),
  fundIRR: (filters: GetFundFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundIRR(filters),
  }),
  fundExitIRR: (filters: GetFundFilters) => ({
    queryKey: [filters],
    queryFn: () => getFundExitIRR(filters),
  }),
});
