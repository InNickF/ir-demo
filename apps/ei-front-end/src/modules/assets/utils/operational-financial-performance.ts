import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";

export const OPERATIONAL_FINANCIAL_PERFORMANCE_HISTORICAL_CHART_VARIANTS = [
  "normal",
  "accumulated",
] as const;

export const OPERATIONAL_FINANCIAL_PERFORMANCE_COMPARISONS = [
  "budget",
  "underwriting",
  "other",
] as const;

export const OPERATIONAL_STATEMENT_METRICS = [
  "total_revenue",
  "total_recoverable_expenses",
  "total_non_recoverable_expenses",
  "total_net_operating_income",
  "interest_expense",
  "net_income_after_debt",
  "total_cash_flow_from_operating_activities",
  "total_cash_flow_from_investing_activities",
  "total_cash_flow_from_financing_activities",
  "cash_flow",
  "contributions",
  "distributions",
] as const;

export const OPERATIONAL_FINANCIAL_PERFORMANCE_HIGHLIGHTED_METRICS = [
  "total_revenue",
  "total_net_operating_income",
  "net_income_after_debt",
  "cash_flow",
];

export const OPERATIONAL_FINANCIAL_PERFORMANCE_REVENUE_METRICS = [
  "total_revenue",
  "total_net_operating_income",
  "net_income_after_debt",
  "total_cash_flow_from_operating_activities",
  "total_cash_flow_from_investing_activities",
  "total_cash_flow_from_financing_activities",
  "cash_flow",
];

export const OPERATIONAL_FINANCIAL_PERFORMANCE_ALWAYS_INTEGERS = [
  "total_recoverable_expenses",
  "total_non_recoverable_expenses",
  "interest_expense",
  "contributions",
  "distributions",
];

export const OPERATIONAL_FINANCIAL_PERFORMANCE_METRIC_TYPES = [
  "positive",
  "negative",
] as const;

interface GetTextColorForOFPMetricComparison {
  variance: number;
  type: "positive" | "negative";
}

export const getTextColorForOFPMetricComparison = ({
  variance,
  type,
}: GetTextColorForOFPMetricComparison): string | null => {
  if (variance === 0 && variance === 0) {
    return null;
  }

  if (type === "positive" && variance > 0) {
    return "text-success-dark";
  }

  if (type === "positive" && variance < 0) {
    return "text-error-dark";
  }

  if (type === "negative" && variance > 0) {
    return "text-error-dark";
  }

  if (type === "negative" && variance < 0) {
    return "text-success-dark";
  }
};

export const operationalFinancialPerformanceDollarFormatter = (
  amount: number
) => {
  return numberToDollar({
    value: amount,
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });
};
