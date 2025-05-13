import { LegacyGenericLabelValueObjectSchema } from "@/commons/schemas/filters";
import { z } from "zod";

export const FundKpiDataSchema = z.object({
  title: z.string(),
  text: z.string().or(z.number()),
});

export const FundKpiMetricSchema = z.object({
  title: z.string(),
  data: z.array(FundKpiDataSchema),
});

export const FundKpiSchema = z.object({
  name: z.string(),
  fund: z.array(FundKpiMetricSchema),
});

export const FundOutstandingBalanceByLenderSchema = z.object({
  lender: z.string(),
  total: z.number(),
});

export const FundMaturityLenderSchema = LegacyGenericLabelValueObjectSchema(
  z.array(LegacyGenericLabelValueObjectSchema(z.number()))
);

export const FundLenderByLtvSchema = z.object({
  current_ltv: z.number().nullish(),
  lender_name: z.string().nullish(),
  loan_name: z.string().nullish(),
  calculated_interest_rate: z.number().nullish(),
  current_outstanding_loan_balance: z.number().nullish(),
  initial_maturity_date: z.string().nullish(),
  debt_yield_over_last_12_months_noidm: z.number().nullish(),
});
