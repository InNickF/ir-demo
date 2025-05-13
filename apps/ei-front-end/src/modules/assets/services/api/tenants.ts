import { privateAxios } from "@/commons/services/clients";
import { z } from "zod";
import {
  LeaseExpirationSchema,
  LegacyStackingPlanTenantSchema,
  LegacyTenantSchema,
  TenantTableSchema,
} from "../../schemas/tenants";
import { LegacyTenant } from "../../typings/tenants";

import { KpiTenantPropertySchema } from "../../schemas/kpis";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";

export const getAllTenants = async () => {
  const response = await privateAxios.get("/asset/tenant/");
  return z.array(LegacyTenantSchema).parse(response.data);
};

export const getTenantsTableInformation = async (
  id: LegacyTenant["id"],
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/asset/tenant/${id}/table-information/${serializedQuery}`
  );

  return z.array(TenantTableSchema).parse(response.data);
};

export const getLeaseExpirationGraphInformation = async (
  id: LegacyTenant["id"]
) => {
  const response = await privateAxios.get(
    `/asset/tenant/${id}/lease-expiration-graph`
  );

  return z.array(LeaseExpirationSchema).parse(response.data);
};

export const getKpiByProperty = async (id: LegacyTenant["id"]) => {
  const response = await privateAxios.get(`/asset/tenant/${id}/kpi`);

  return KpiTenantPropertySchema.parse(response.data);
};

export const getTenantsByProperty = async (id: LegacyTenant["id"]) => {
  const response = await privateAxios.get(`/asset/tenant/${id}`);

  return z.array(LegacyTenantSchema).parse(response.data);
};

export const getLegacyStackingPlanTenantByProperty = async (
  id: LegacyTenant["id"]
) => {
  const response = await privateAxios.get(`/asset/tenant/${id}/stacking-plan`);

  return z.array(LegacyStackingPlanTenantSchema).parse(response.data);
};
