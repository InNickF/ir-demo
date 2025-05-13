import { z } from "zod";

export const LeasedNOIsMetricsSchema = z.object({
  noi_leased_noidm: z.number().nullish(),
  debt_yield_leased_noidm: z.number().nullish(),
  dscr_leased_noidm: z.number().nullish(),
  yield_on_cost_leased_noidm: z.number().nullish(),
});

export const T12NOIsMetricsSchema = z.object({
  noi_over_last_12_months_noidm: z.number().nullish(),
  debt_yield_over_last_12_months_noidm: z.number().nullish(),
  dscr_over_last_12_months_noidm: z.number().nullish(),
  yield_on_cost_over_last_12_months_noidm: z.number().nullish(),
  current_cash_on_cash_over_last_12_months: z.number().nullable(),
});

export const F12NOIsMetricsSchema = z.object({
  noi_forward_12_months_noidm: z.number().nullish(),
  debt_yield_forward_12_months_noidm: z.number().nullish(),
  dscr_forward_12_months_noidm: z.number().nullish(),
  yield_on_cost_forward_12_months_noidm: z.number().nullish(),
});

export const NOIsDerivedMetricsSchema = z.object({
  ...LeasedNOIsMetricsSchema.shape,
  ...T12NOIsMetricsSchema.shape,
  ...F12NOIsMetricsSchema.shape,
});
