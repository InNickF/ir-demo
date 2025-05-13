import { genericFormatterParseFn } from "@/commons/model-in/formatters";
import { ValueFormatter } from "@/commons/model-in/formatters/types";
import {
  commonTwoFractionOptions,
  genericGetValue,
} from "@/commons/model-in/formatters/utils";
import {
  commonNumberToDollarFn,
  numberToPercentX,
  numberToScaledPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";

import { DebtLoan } from "@/debt/typings/loans";

export const debtLoansFormatter: ValueFormatter<DebtLoan> = {
  map: {
    borrower_name: ({ value }) => ({ value: genericGetValue(value, true) }),
    loan_name: ({ value }) => ({ value: genericGetValue(value, true) }),
    lender_name: ({ value }) => ({ value: genericGetValue(value, true) }),
    note_date: ({ value }) => ({ value: genericGetValue(value, true) }),
    spread: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    index_rate: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    calculated_interest_rate: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    current_outstanding_loan_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    debt_yield_over_last_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    yield_on_cost_over_last_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    current_dscr: ({ value }) => ({ value: numberToPercentX({ value }) }),
    dscr_over_last_12_months_noidm: ({ value }) => ({
      value: numberToPercentX({ value }),
    }),
    current_ltv: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    amortization_type: ({ value }) => ({ value: genericGetValue(value) }),
    expiration_date: ({ value }) => ({ value: genericGetValue(value) }),
    percentage_debt: ({ value }) => ({
      value: numberToScaledPercent({ value }),
    }),
    original_term: ({ value }) => ({
      value: readableNumber(value),
      className: "font-mono text-right",
    }),
    rate_cap_vs_swap: ({ value }) => ({ value: genericGetValue(value) }),
    index_name: ({ value }) => ({ value: genericGetValue(value) }),
    loan_amount_max_commitment: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
    }),
    initial_maturity_date: ({ value }) => ({ value: genericGetValue(value) }),
    chatham_loan_name: ({ value }) => ({ value: genericGetValue(value) }),
    current_notional: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
    }),
    current_strike: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    index_spread: ({ value }) => ({ value: genericGetValue(value) }),
    index_description: ({ value }) => ({ value: genericGetValue(value) }),
    maturity_date: ({ value }) => ({ value: genericGetValue(value) }),
    fund_name: ({ value }) => ({ value: genericGetValue(value) }),
    debt_yield_leased_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    dscr_leased_noidm: ({ value }) => ({
      value: numberToPercentX({ value }),
    }),
    yield_on_cost_leased_noidm: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
  },

  format(params) {
    return genericFormatterParseFn({ ...params, map: this.map });
  },
};
