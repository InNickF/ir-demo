import { z } from "zod";

export const KpiCashflowSchema = z.object({
  id: z.number().nullish(),
  address: z.string().nullish(),
  Contrib: z.string().nullish(),
  Distrib: z.string().nullish(),
  Profit: z.string().nullish(),
  MoC: z.string().nullish(),
  IRR: z.number().nullish(),
  property: z.string().nullish(),
  source: z.string().nullish(),
  quarter: z.string().nullish(),
  year: z.number().nullish(),
  sf: z.number().nullish(),
  total_basis: z.number().nullish(),
});

export const KpiTenantPropertySchema = z.object({
  noi: z.number().nullish(),
  totalArea: z.number().nullish(),
  occupancy: z.number().nullish(),
  walt: z.number().nullish(),
  gav: z.number().nullish(),
  investedCapital: z.number().nullish(),
  nav: z.number().nullish(),
  cashOnCash: z.number().nullish(),
  yieldCost: z.number().nullish(),
  debtYield: z.number().nullish(),
  quarter: z.string().nullish(),
  year: z.number().nullish(),
  sf: z.number().nullish(),
});

export const KpiPortfolioSchema = z.object({
  noi: z.number().nullish(),
  contrib: z.number().nullish(),
  distrib: z.number().nullish(),
  moc: z.number().nullish().or(z.string()),
  capitalInvested: z.number().nullish(),
  profit: z.number().nullish(),
  irr: z.number().nullish(),
  cashOnCash: z.number().nullish(),
  yieldCost: z.number().nullish(),
  fmv: z.number().nullish(),
  gmv: z.number().nullish(),
  occupancy: z.number().nullish(),
  debtYield: z.number().nullish(),
  walt: z.number().nullish(),
  fund: z.string().nullish(),
  quarter: z.string().nullish(),
  year: z.number().nullish(),
});
