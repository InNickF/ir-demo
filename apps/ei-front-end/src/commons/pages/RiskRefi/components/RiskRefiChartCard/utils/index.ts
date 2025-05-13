import am5 from "@/commons/utils/amcharts5";
import {
  numberToScaledPercent,
  commonNumberToDollarFn,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { FundLenderByLtv } from "@/modules/debt/typings/fund";
import { lenderColorBasedOnMaturity } from "../../../utils";

export const riskRefiChartCustomTooltip = (lender: FundLenderByLtv) => {
  const mortgagePayable = commonNumberToDollarFn({
    value: lender?.current_outstanding_loan_balance,
  });
  const ltv = numberToScaledPercent({ value: lender?.current_ltv });
  const rate = numberToScaledPercent({
    value: lender?.calculated_interest_rate,
  });

  return `Loan Name: ${lender?.loan_name}\nRate: ${rate}\nMortgage Payable: ${mortgagePayable}\nLTV: ${ltv}\nLender: ${lender?.lender_name}`;
};

export const riskRefiChartBulletSettings = (
  maturity: FundLenderByLtv["initial_maturity_date"],
  isDarkTheme: boolean
) => {
  const color = lenderColorBasedOnMaturity(maturity, isDarkTheme);
  return {
    fill: am5.color(color),
    stroke: am5.color(color),
  };
};
