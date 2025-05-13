import { z } from "zod";
import { AR_TENANT_TYPES } from "../utils";

export const LegacyTenantSchema = z.object({
  id: z.string().nullish(),
  term: z.number().nullish(),
  difDate: z.number().nullish(),
  rent: z.number().nullish(),
  leaseStatus: z.string().nullish(),
  lcd: z.string().or(z.number()).nullish(),
  lxd: z.string().or(z.number()).nullish(),
  name: z.string().nullish(),
  grossNet: z.string().nullish(),
  extension: z.string().nullish(),
  areaSqft: z.number().nullish(),
  flag: z.boolean().nullish(),
  argusMarket: z.number().nullish(),
  unitCode: z.string().nullish(),
});

export const LegacyStackingPlanTenantSchema = z.object({
  name: z.string().nullish(),
  area: z.number().nullish(),
  lxd: z.string().nullish(),
  difDate: z.number().nullish(),
  argusMarket: z.number().nullish(),
  annualRentPSF: z.string().nullish(),
  percentageMarket: z.string().nullish(),
});

const PickTenantValues = LegacyTenantSchema.pick({
  name: true,
  lxd: true,
  grossNet: true,
});

const TenantTable = z.object({
  remainingTerm: z.string().nullish(),
  rentAnnualPsf: z.string().nullish(),
  marketRent: z.number().nullish(),
  percentageMarket: z.string().nullish(),
  sf: z.string().nullish(),
});

export const TenantTableSchema = PickTenantValues.merge(TenantTable);

export const LeaseExpiration = z.record(z.string(), z.string().or(z.number()));

export const LeaseExpirationByYear = z.object({
  year: z.string(),
});

export const LeaseExpirationSchema = z.intersection(
  LeaseExpiration,
  LeaseExpirationByYear
);
export const LeaseExpirationGraphSchema = z.intersection(
  z.object({
    year: z.number().nullish(),
  }),
  z.record(z.string(), z.number())
);

export const ARTenantTypeSchema = z.enum(AR_TENANT_TYPES);
