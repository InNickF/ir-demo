import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getOverviewDebtInformation,
  getOverviewTimeline,
  GetOverviewTimelineFilters,
} from "../api/overview";

export const overviewQueries = createQueryKeys("overview", {
  debtInformation: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getOverviewDebtInformation(filters),
  }),
  timeline: (filters: GetOverviewTimelineFilters) => ({
    queryKey: [filters],
    queryFn: () => getOverviewTimeline(filters),
  }),
});
