import { FundMaturityLender } from "@/modules/debt/typings/fund";
import { FundMaturityLenderChartType } from "../components/LoanMaturityChart";

export const getPeriodBasedOnMonths = (months: number) => {
  if (months <= 3) return "0-3 Months";
  if (months <= 6) return "4-6 Months";
  if (months <= 9) return "7-9 Months";
  if (months <= 12) return "10-12 Months";
  if (months <= 24) return "12-24 Months";
  if (months <= 36) return "24-36 Months";
  if (months <= 48) return "36-48 Months";
  return "48+ Months";
};

export const monthPeriods = [
  "0-3 Months",
  "4-6 Months",
  "7-9 Months",
  "10-12 Months",
  "12-24 Months",
  "24-36 Months",
  "36-48 Months",
  "48+ Months",
];

export const transformFundMaturityLenderDataToChart = (
  data: FundMaturityLender[]
): FundMaturityLenderChartType[] => {
  return data.map((period) => {
    return {
      period: period?.label,
      ...period.value.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.label]: curr.value,
        };
      }, {} as FundMaturityLenderChartType),
    } as FundMaturityLenderChartType;
  });
};
