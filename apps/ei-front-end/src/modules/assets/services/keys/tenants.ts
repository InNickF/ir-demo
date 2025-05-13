import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getKpiByProperty,
  getLeaseExpirationGraphInformation,
  getLegacyStackingPlanTenantByProperty,
  getTenantsByProperty,
  getTenantsTableInformation,
} from "../api/tenants";
import { LegacyProperty } from "../../typings/property";

export const tenantsQueries = createQueryKeys("tenants", {
  allTenants: null,
  tenantsByProperty: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => getTenantsByProperty(id),
  }),
  kpiByProperty: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => getKpiByProperty(id),
  }),
  leaseExpirationGraph: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => getLeaseExpirationGraphInformation(id),
  }),
  tenantTableInformation: (id: LegacyProperty["property_code"], ordering) => ({
    queryKey: [{ id, ordering }],
    queryFn: () => getTenantsTableInformation(id, ordering),
  }),
  legacyStackingPlanTenant: (id: LegacyProperty["property_code"]) => ({
    queryKey: [id],
    queryFn: () => getLegacyStackingPlanTenantByProperty(id),
  }),
});
