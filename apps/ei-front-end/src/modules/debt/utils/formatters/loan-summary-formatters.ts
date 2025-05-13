import { ValueFormatter } from "@/commons/model-in/formatters/types";
import {
  commonTwoFractionOptions,
  genericGetValue,
} from "@/commons/model-in/formatters/utils";
import {
  commonNumberToDollarFn,
  numberToPercentX,
  numberToScaledPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";

import { genericFormatterParseFn } from "@/commons/model-in/formatters";
import { DebtLoanContentKeys } from "../../typings/loans";

export const loanContentDetailFormatter: ValueFormatter<DebtLoanContentKeys> = {
  map: {
    lender_name: ({ value }) => ({ value: genericGetValue(value) }),
    note_date: ({ value }) => ({ value: genericGetValue(value) }),
    initial_maturity_date: ({ value }) => ({ value: genericGetValue(value) }),
    fully_extended_maturity_date: ({ value }) => ({
      value: genericGetValue(value),
    }),
    original_term: ({ value }) => ({ value: genericGetValue(value) }),
    amort_term: ({ value }) => ({ value: genericGetValue(value) }),
    amortization_type: ({ value }) => ({ value: genericGetValue(value) }),
    loan_amount_max_commitment: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    current_outstanding_loan_balance: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    loan_amount_initial: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
      className: "font-mono text-right",
    }),
    loan_type: ({ value }) => ({ value: genericGetValue(value) }),
    spread: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
    all_in_floor: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
    accrual_type: ({ value }) => ({ value: genericGetValue(value) }),
    index_name: ({ value }) => ({ value: genericGetValue(value) }),
    carveout_guarantor: ({ value }) => ({ value: genericGetValue(value) }),
    borrower_recourse: ({ value }) => ({ value: genericGetValue(value) }),
    recourse_type: ({ value }) => ({ value: genericGetValue(value) }),
    net_worth_liquidity_first_test_date: ({ value }) => ({
      value: genericGetValue(value),
    }),
    net_worth_liquidity_test_reoccurrence: ({ value }) => ({
      value: genericGetValue(value),
    }),
    net_worth_covenant: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
    }),
    liquidity_covenant: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
    }),
    debt_yield_over_last_12_months_noidm: ({ value }) => ({
      value: numberToScaledPercent({ value }),
    }),
    dscr_over_last_12_months_noidm: ({ value }) => ({
      value: numberToPercentX({ value }),
    }),
    calculated_interest_rate: ({ value }) => ({
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
    current_ltv: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
    current_strike: ({ value }) => ({
      value: numberToScaledPercent({
        value,
        options: commonTwoFractionOptions,
      }),
    }),
    current_notional: ({ value }) => ({
      value: commonNumberToDollarFn({ value }),
    }),
    index_rate: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
    maturity_date: ({ value }) => ({ value: genericGetValue(value) }),
    cap_maturity_date: ({ value }) => ({ value: genericGetValue(value) }),
    chatham_loan_name: ({ value }) => ({ value: genericGetValue(value) }),
    chatham_cap_name: ({ value }) => ({ value: genericGetValue(value) }),
  },

  format(params) {
    return genericFormatterParseFn({ ...params, map: this.map });
  },
};
