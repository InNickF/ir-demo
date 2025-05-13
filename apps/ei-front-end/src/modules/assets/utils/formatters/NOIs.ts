import { createValueFormatter } from "@/commons/model-in/formatters";
import { commonTwoFractionOptions } from "@/commons/model-in/formatters/utils";
import {
  commonNumberToDollarFn,
  commonNumberToScaledPercent,
  numberToScaledPercent,
  readableNumberWithOptions,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { NOIsDerivedMetricsSchema } from "../../schemas/NOIs";

export const NOIsDerivedMetricsFormatter = createValueFormatter({
  schema: NOIsDerivedMetricsSchema,
  map: {
    current_cash_on_cash_over_last_12_months: ({ value }) => ({
      value: commonNumberToScaledPercent({ value }),
    }),
    noi_over_last_12_months_noidm: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    yield_on_cost_over_last_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    debt_yield_forward_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    debt_yield_leased_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
      className: "font-mono text-right",
    }),
    debt_yield_over_last_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    dscr_forward_12_months_noidm: ({ value }) => ({
      value: readableNumberWithOptions({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    dscr_leased_noidm: ({ value }) => ({
      value: readableNumberWithOptions({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    dscr_over_last_12_months_noidm: ({ value }) => ({
      value: readableNumberWithOptions({
        value,
        options: commonTwoFractionOptions,
      }),
      className: "font-mono text-right",
    }),
    noi_forward_12_months_noidm: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    noi_leased_noidm: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    yield_on_cost_forward_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    yield_on_cost_leased_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
  },
});
