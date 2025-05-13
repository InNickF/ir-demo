import { z } from "zod";

export const OverviewDebtInformationSchema = z.object({
  current_outstanding_loan_balance: z.number().nullish(),
  loans: z.number().nullish(),
  lenders: z.number().nullish(),
  interest_rate: z.number().nullish(),
  current_ltv: z.number().nullish(),
  dscr_over_last_12_months_noidm: z.number().nullish(),
  debt_yield_over_last_12_months_noidm: z.number().nullish(),
  avg_maturity_months: z.number().nullish(),
  min_ltv: z.number().nullish(),
  max_ltv: z.number().nullish(),
  yield_on_cost_over_last_12_months_noidm: z.number().nullish(),
});

export const OverviewTimelineSchema = z.object({
  id: z.string(),
  address: z.string().nullish(),
  critical_date: z.string().nullish(),
  remaining_days: z.number().nullish(),
});
