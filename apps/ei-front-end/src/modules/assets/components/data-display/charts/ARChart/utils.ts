import { ARChartItem } from "@/modules/assets/typings/portfolio";
import { AR_CHART_VALUE_LABELS } from "@/modules/assets/utils";
import { ARChartSeriesItem } from "./types";

export interface ARChartDataTransformationParams {
  data: ARChartItem[];
}
export const arChartDataTransformation = ({
  data = [],
}: ARChartDataTransformationParams): ARChartSeriesItem[] => {
  return data.reverse().map((item) => {
    const transformed = AR_CHART_VALUE_LABELS.reduce(
      (acc, label) => {
        acc[label] = 0;
        return acc;
      },
      { label: item.label }
    ) as ARChartSeriesItem;

    item.value.forEach((valueItem) => {
      if (valueItem?.label === "5. (Prepay)") {
        transformed[valueItem?.label] = Math.abs(valueItem?.value);
        return;
      }
      transformed[valueItem?.label] = valueItem?.value;
    });

    return transformed;
  });
};

interface GetChartDataWithTotalsParams {
  data: ARChartSeriesItem;
  usePrepay?: boolean;
}
export const getChartDataWithTotals = ({
  data,
  usePrepay = true,
}: GetChartDataWithTotalsParams): ARChartSeriesItem => {
  const total = Object.keys(data).reduce((acc, key) => {
    if (key === "label") {
      return acc;
    }
    if (key === "5. (Prepay)" && usePrepay) {
      acc -= data[key];
      return acc;
    }
    if (key === "5. (Prepay)" && !usePrepay) {
      return acc;
    }

    acc += data[key];
    return acc;
  }, 0);

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });

  return {
    ...data,
    label: `${data.label} (${formatter.format(total)})`,
  };
};
