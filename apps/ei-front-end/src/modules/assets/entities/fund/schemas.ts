import { z } from "zod";
import { NOIsDerivedMetricsSchema } from "../../schemas/NOIs";

export const FundSchema = z
  .object({
    capital_invested: z.number().nullable(),
    cashflow_liquidation_contribution: z.number().nullable(),
    cashflow_liquidation_distribution: z.number().nullable(),
    cashflow_projected_contribution: z.number().nullable(),
    cashflow_projected_distribution: z.number().nullable(),
    current_gross_moc: z.number().nullable(),
    current_irr: z.number().nullable(),
    current_nav: z.number().nullable(),
    current_profit: z.number().nullable(),
    current_walt: z.number().nullable(),
    fund_name: z.string().nullable(),
    current_gav: z.number().nullable(),
    projected_exit_gav: z.number().nullable(),
    projected_exit_nav: z.number().nullable(),
    occupancy_rate: z.number().nullable(),
    projected_exit_invested_capital: z.number().nullish(),
    projected_exit_gross_moc: z.number().nullable(),
    projected_exit_irr: z.number().nullable(),
    projected_exit_noi: z.number().nullish(),
    projected_exit_occupancy_rate: z.number().nullish(),
    projected_exit_profit: z.number().nullable(),
    quarter: z.string().nullish(),
    year: z.number().nullish(),
  })
  .merge(NOIsDerivedMetricsSchema);
