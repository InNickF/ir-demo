import { getChartDateFromString } from "@/commons/utils/charts";
import { FinancialMarketForwardCurvesSOFRCharts } from "@/modules/acquisitions/typings/market-analytics";
import { financialMarketForwardCurvesSOFRChartLabels } from "@/modules/acquisitions/utils/charts";

interface GetSOFRDataParams {
  data: FinancialMarketForwardCurvesSOFRCharts;
  curve: typeof financialMarketForwardCurvesSOFRChartLabels[number];
}
export const getSOFRData = ({ data, curve }: GetSOFRDataParams) => {
  if (!curve || !data) return [];

  const curveItem = data.find((item) => item?.label === curve);
  if (!curveItem) return [];

  return (
    curveItem?.value?.map((item) => {
      return getChartDateFromString({
        chartData: {
          x: item.x,
          y: Number((item.y * 100).toFixed(2)),
        },
        dateKey: "x",
      });
    }) || []
  );
};
