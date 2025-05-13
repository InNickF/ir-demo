import { ARChartValueLabels } from "@/modules/assets/typings/portfolio";

export type ARChartSeriesItem = {
  [key in ARChartValueLabels]: number;
} & {
  label: string;
};
