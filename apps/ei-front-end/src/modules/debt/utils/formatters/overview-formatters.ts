import { genericFormatterParseFn } from "@/commons/model-in/formatters";
import { ValueFormatter } from "@/commons/model-in/formatters/types";
import {
  commonTwoFractionOptions,
  convertToTitleCase,
} from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  commonNumberToDollarFn,
  commonNumberToScaledPercent,
  numberToPercentX,
  numberToScaledPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";

import { DebtLoanTimeline } from "@/debt/typings/loans";
import { OverviewDebtInformation } from "@/debt/typings/overview";

export type TimelineFormatter = {
  [Key in keyof DebtLoanTimeline]: (value: DebtLoanTimeline[Key]) => string;
};

export const debtInformationHeaderFormatter = (params: {
  key: keyof OverviewDebtInformation;
}) => {
  const map: { [Key in keyof OverviewDebtInformation]: () => string } = {
    current_outstanding_loan_balance: () => "Outstanding Loan Balance",
    dscr_over_last_12_months_noidm: () => "DSCR T12",
    debt_yield_over_last_12_months_noidm: () => "Debt Yield T12",
    avg_maturity_months: () => "Avg Maturity (Months)",
    yield_on_cost_over_last_12_months_noidm: () => "Yield on Cost T12",
  };
  const formatter = map?.[params.key];
  return formatter
    ? formatter()
    : convertToTitleCase(humanizeSnakeCase(params.key));
};

export const debtInformationFormatter: ValueFormatter<OverviewDebtInformation> =
  {
    map: {
      current_outstanding_loan_balance: ({ value }) => ({
        value: commonNumberToDollarFn({ value }),
      }),
      loans: ({ value }) => ({ value: readableNumber(value) }),
      lenders: ({ value }) => ({ value: readableNumber(value) }),
      interest_rate: ({ value }) => ({
        value: numberToScaledPercent({
          value,
          options: commonTwoFractionOptions,
        }),
      }),
      current_ltv: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
      dscr_over_last_12_months_noidm: ({ value }) => ({
        value: numberToPercentX({ value }),
      }),
      debt_yield_over_last_12_months_noidm: ({ value }) => ({
        value: commonNumberToScaledPercent({ value }),
      }),
      avg_maturity_months: ({ value }) => ({ value: readableNumber(value) }),
      min_ltv: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
      max_ltv: ({ value }) => ({ value: numberToScaledPercent({ value }) }),
      yield_on_cost_over_last_12_months_noidm: ({ value }) => ({
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

export const timelineFormatter: TimelineFormatter = {
  loan_name: (value) => genericGetValue(value),
  type: (value) => genericGetValue(value),
  notable_date: (value) => transformInputDateToMMDDYYYY(genericGetValue(value)),
  comment: (value) => genericGetValue(value),
};
