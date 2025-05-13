import { MapFormatter } from "@/commons/model-in/formatters/types";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { OperationalStatementTableMetrics } from "@/modules/assets/typings/property";

export const operationalStatementTableColumns: Array<
  keyof Omit<OperationalStatementTableMetrics, "drill_down">
> = [
  "metric",
  "actual",
  "reference",
  "variance",
  "variance_percentage",
  "account_comments",
];

export const operationalStatementTableFormatter: MapFormatter<
  Omit<OperationalStatementTableMetrics, "drill_down">,
  string | string[]
> = {
  metric: ({ value }) => ({ value: convertToTitleCase(value) }),
  actual: ({ value }) => ({
    value: numberToDollar({
      value,
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    }),
    className: "font-mono text-right",
  }),
  reference: ({ value }) => ({
    value: numberToDollar({
      value,
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    }),
    className: "font-mono text-right",
  }),
  variance: ({ value }) => ({
    value: numberToDollar({
      value,
      options: {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    }),
    className: "font-mono text-right",
  }),
  variance_percentage: ({ value }) => ({ value: numberToPercent(value) }),
  account_comments: ({ value }) => ({ value: value }),
};
