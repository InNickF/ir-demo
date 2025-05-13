import { createFormatter } from "@/commons/model-in/formatters";
import {
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
import { FundSchema } from "./schemas";

export const fundFormatter = createFormatter({
  schema: FundSchema,
  valueMap: {
    cashflow_liquidation_contribution: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    cashflow_liquidation_distribution: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_irr: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    current_profit: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    cashflow_projected_contribution: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    cashflow_projected_distribution: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_exit_gross_moc: ({ value }) => ({
      value: numberToPercentX({ value }),
    }),
    projected_exit_irr: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    projected_exit_profit: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_gross_moc: ({ value }) => ({ value: numberToPercentX({ value }) }),
    capital_invested: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_nav: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_exit_nav: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_gav: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    projected_exit_gav: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    occupancy_rate: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
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
    fund_name: ({ value }) => ({ value: genericGetValue(value) }),
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
    quarter: ({ value }) => ({ value: genericGetValue(value) }),
    year: ({ value }) => ({ value: String(genericGetValue(value)) }),
    ...NOIsDerivedMetricsFormatter.map,
  },
});
