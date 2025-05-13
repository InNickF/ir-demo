import { z } from "zod";
import {
  LegacyTenantSchema,
  LegacyStackingPlanTenantSchema,
  TenantTableSchema,
  LeaseExpirationSchema,
  ARTenantTypeSchema,
} from "../schemas/tenants";
import { MarkerCustomProps } from "@/commons/typings";

export type LegacyTenant = z.infer<typeof LegacyTenantSchema>;

export type TenantTable = z.infer<typeof TenantTableSchema>;

export type LeaseExpirationGraph = z.infer<typeof LeaseExpirationSchema>;

export type LegacyStackingPlanTenant = z.infer<
  typeof LegacyStackingPlanTenantSchema
>;

export interface PropertyGeographyMapLocation extends MarkerCustomProps {
  name?: string;
  lender?: string;
  region?: string;
  status?: string;
  id?: string;
  gav?: number;
}

export type ARTenantType = z.infer<typeof ARTenantTypeSchema>;
