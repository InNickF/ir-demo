import { createFormatter } from "@/commons/model-in/formatters";
import {
  booleanToYesNoString,
  genericGetValue,
  genericNoDataText,
} from "@/commons/model-in/formatters/utils";
import {
  commonNumberToDollarFn,
  commonNumberToScaledPercent,
  numberToPercentX,
  readableNumberWithOptions,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { NOIsDerivedMetricsFormatter } from "@/modules/assets/utils/formatters/NOIs";
import { PropertySchema } from "./schema";

export const propertyFormatter = createFormatter({
  schema: PropertySchema,
  headerMap: {
    accounts_receivable_balance_with_pre_payments_active_tenant: {
      value: "A/R Balance with Pre-Payments (Active Tenant)",
    },
    accounts_receivable_balance_with_pre_payments_all_tenant: {
      value: "A/R Balance with Pre-Payments (All Tenant)",
    },
    accounts_receivable_balance_without_pre_payments_active_tenant: {
      value: "A/R Balance without Pre-Payments (Active Tenant)",
    },
    accounts_receivable_balance_without_pre_payments_all_tenant: {
      value: "A/R Balance without Pre-Payments (All Tenant)",
    },
    account_payable_balance: { value: "A/P Balance" },
    name: { value: "Asset Name" },
    property_id: { value: "ID" },
    fund_name: { value: "Fund" },
  },
  valueMap: {
    acquisition_date: ({ value }) => ({ value: genericGetValue(value) }),
    address: ({ value }) => ({ value: genericGetValue(value) }),
    accounts_receivable_balance_with_pre_payments_active_tenant: ({
      value,
    }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    accounts_receivable_balance_with_pre_payments_all_tenant: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    accounts_receivable_balance_without_pre_payments_active_tenant: ({
      value,
    }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    accounts_receivable_balance_without_pre_payments_all_tenant: ({
      value,
    }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    account_payable_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    capital_invested: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    cash_available_per_bank: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    city: ({ value }) => ({ value: genericGetValue(value) }),
    current_accrued_interest_loan_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_amortization_loan_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_cash_on_cash_over_last_12_months: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),

    current_gav: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_gross_irr: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    current_ltv: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    current_gross_moc: ({ value }) => ({ value: numberToPercentX({ value }) }),
    current_nav: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_outstanding_loan_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_profit: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_total_basis: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_walt: ({ value }) => ({
      value:
        value || value === 0
          ? `${readableNumberWithOptions({
              value,
              options: {
                maximumFractionDigits: 2,
              },
            })} years`
          : genericNoDataText,
    }),
    execution_strategy: ({ value }) => ({
      value: genericGetValue(value?.trim()),
    }),
    fund_name: ({ value }) => ({ value: genericGetValue(value) }),
    interest_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    is_asset_exited: ({ value }) => ({
      value: booleanToYesNoString({ value }),
    }),
    latitude: ({ value }) => ({
      value: readableNumberWithOptions({ value }),
      className: "font-mono text-right",
    }),
    longitude: ({ value }) => ({
      value: readableNumberWithOptions({ value }),
      className: "font-mono text-right",
    }),
    loan_amount_max_commitment: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    market_name: ({ value }) => ({ value: genericGetValue(value) }),
    name: ({ value }) => ({ value: genericGetValue(value, true) }),
    occupancy_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    price_at_acquisition: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    price_at_exit: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_buyers_3rd_year_yoc: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    projected_exit_cap_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    projected_exit_gross_irr: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    projected_exit_gross_moc: ({ value }) => ({
      value: numberToPercentX({ value }),
    }),
    projected_exit_imputed_cap_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    projected_exit_invested_capital: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_exit_noi: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_exit_occupancy_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    projected_exit_profit: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_exit_total_basis: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_net_proceeds_after_sale: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_sale_price: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    property_id: ({ value }) => ({
      value: readableNumberWithOptions({ value }),
      className: "font-mono text-right",
    }),
    region: ({ value }) => ({ value: genericGetValue(value) }),
    rentable_building_area: ({ value }) => ({
      value: readableNumberWithOptions({ value }),
      className: "font-mono text-right",
    }),
    state: ({ value }) => ({ value: genericGetValue(value) }),
    submarket_name: ({ value }) => ({ value: genericGetValue(value) }),
    type: ({ value }) => ({ value: genericGetValue(value) }),
    vacancy_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    year_built: ({ value }) => ({ value: genericGetValue(value) }),
    yardi_property_code: ({ value }) => ({ value: genericGetValue(value) }),
    zip_code: ({ value }) => ({ value: genericGetValue(value) }),
    year_renovated: ({ value }) => ({ value: genericGetValue(value) }),
    ...NOIsDerivedMetricsFormatter.map,
  },
});
