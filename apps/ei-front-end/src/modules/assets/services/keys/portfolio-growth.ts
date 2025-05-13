import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getAssetLocation,
  getGeographicConcentration,
  getProjectedNoiGrowth,
} from "../api/portfolio-growth";

export const portfolioGrowthQueries = createQueryKeys("portfolioGrowth", {
  projectedNoiGrowth: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getProjectedNoiGrowth(filters),
  }),
  geographicConcentration: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getGeographicConcentration(filters),
  }),
  assetLocation: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getAssetLocation(filters),
  }),
});
