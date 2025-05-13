import { commonTwoFractionOptions } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToScaledPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { FundLenderByLtv } from "@/modules/debt/typings/fund";
import { Label } from "in-ui-react";
import { FC } from "react";

interface LenderBodyMetricsProps {
  lender: FundLenderByLtv;
}

interface LenderKeysToDisplay {
  key: keyof FundLenderByLtv;
  title: string;
  value: string | number;
}

export const LenderBodyMetrics: FC<LenderBodyMetricsProps> = ({ lender }) => {
  const prefix = "debt-risk-refi-lender-card";

  const lenderKeysToDisplay: LenderKeysToDisplay[] = [
    {
      key: "current_outstanding_loan_balance",
      title: "",
      value: numberToDollar({
        value: lender?.current_outstanding_loan_balance,
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
    },
    {
      key: "calculated_interest_rate",
      title: "Rate",
      value: numberToScaledPercent({
        value: lender?.calculated_interest_rate,
        options: commonTwoFractionOptions,
      }),
    },
    {
      key: "debt_yield_over_last_12_months_noidm",
      title: "Debt Yield T12",
      value: numberToScaledPercent({
        value: lender?.debt_yield_over_last_12_months_noidm,
        options: commonTwoFractionOptions,
      }),
    },
    {
      key: "current_ltv",
      title: "LTV",
      value: numberToScaledPercent({ value: lender?.current_ltv }),
    },
    {
      key: "initial_maturity_date",
      title: "Maturity",
      value: new Date(lender?.initial_maturity_date).toLocaleDateString(),
    },
  ];
  return (
    <div className={`${prefix}__body`}>
      {lenderKeysToDisplay.map((lenderKey) => (
        <>
          {lenderKey.key === "current_outstanding_loan_balance" ? (
            <div className={`${prefix}__mortagage`}>{lenderKey.value}</div>
          ) : (
            <div key={lenderKey.key} className={`${prefix}__body-item`}>
              <Label className={`${prefix}__body-item-title`}>
                {lenderKey.title}
              </Label>
              <p>{lenderKey.value}</p>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
