import { DebtLoanContentKeys } from "@/modules/debt/typings/loans";

export const loanSummaryKeysFullWidth: string[] = [
  "borrower_reporting",
  "covenant_testing",
  "guarantor_lender_reporting",
  "covenant_testing_dy",
  "covenant_testing_dscr",
  "covenant_testing_noi",
];

export const loanInterestRateInformationKeysOrder: Array<
  keyof DebtLoanContentKeys
> = [
  "calculated_interest_rate",
  "spread",
  "index_name",
  "index_rate",
  "accrual_type",
  "all_in_floor",
  "cap_maturity_date",
  "current_notional",
  "chatham_loan_name",
  "current_strike",
];
