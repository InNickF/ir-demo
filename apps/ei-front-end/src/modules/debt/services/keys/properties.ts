import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getDebtProperties, GetDebtPropertiesFilters } from "../api/properties";

export const propertiesQueries = createQueryKeys("properties", {
  all: (filters: GetDebtPropertiesFilters) => ({
    queryKey: [filters],
    queryFn: () => getDebtProperties(filters),
  }),
});
