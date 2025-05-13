import { z } from "zod";
import { NOIsDerivedMetricsSchema } from "../../schemas/NOIs";

export const PropertySchema = z
  .object({
    acquisition_date: z.string().nullable(),
    address: z.string().nullable(),
    cash_available_per_bank: z.number().nullable(),
    city: z.string().nullable(),
    current_accrued_interest_loan_balance: z.number().nullable(),
    current_amortization_loan_balance: z.number().nullable(),
    current_ltv: z.number().nullable(),
    current_outstanding_loan_balance: z.number().nullable(),
    execution_strategy: z.string().nullable(),
    fund_name: z.string().nullable(),
    interest_rate: z.number().nullable(),
    is_asset_exited: z.boolean().nullable(),
    latitude: z.number().nullable(),
    loan_amount_max_commitment: z.number().nullable(),
    longitude: z.number().nullable(),
    market_name: z.string().nullable(),
    name: z.string().nullable(),
    price_at_acquisition: z.number().nullable(),
    price_at_exit: z.number().nullable(),
    property_id: z.number().nullable(),
    region: z.string().nullable(),
    rentable_building_area: z.number().nullable(),
    state: z.string().nullable(),
    submarket_name: z.string().nullable(),
    type: z.string().nullable(),
    vacancy_rate: z.number().nullable(),
    yardi_property_code: z.string().nullable(),
    year_built: z.string().nullable(),
    year_renovated: z.string().nullable(),
    zip_code: z.string().nullable(),
    capital_invested: z.number().nullable(),
    current_gross_irr: z.number().nullable(),
    current_gav: z.number().nullable(),
    occupancy_rate: z.number().nullable(),
    current_gross_moc: z.number().nullable(),
    current_nav: z.number().nullable(),
    current_walt: z.number().nullable(),
    current_profit: z.number().nullable(),
    current_total_basis: z.number().nullable(),
    projected_exit_noi: z.number().nullable(),
    projected_exit_gross_irr: z.number().nullable(),
    projected_exit_invested_capital: z.number().nullable(),
    projected_net_proceeds_after_sale: z.number().nullable(),
    projected_buyers_3rd_year_yoc: z.number().nullable(),
    projected_exit_occupancy_rate: z.number().nullable(),
    projected_exit_gross_moc: z.number().nullable(),
    projected_exit_total_basis: z.number().nullable(),
    projected_exit_cap_rate: z.number().nullable(),
    projected_exit_profit: z.number().nullable(),
    projected_sale_price: z.number().nullable(),
    projected_exit_imputed_cap_rate: z.number().nullable(),
    accounts_receivable_balance_with_pre_payments_active_tenant: z
      .number()
      .nullable(),
    accounts_receivable_balance_with_pre_payments_all_tenant: z
      .number()
      .nullable(),
    accounts_receivable_balance_without_pre_payments_active_tenant: z
      .number()
      .nullable(),
    accounts_receivable_balance_without_pre_payments_all_tenant: z
      .number()
      .nullable(),
    account_payable_balance: z.number().nullable(),
  })
  .merge(NOIsDerivedMetricsSchema);
