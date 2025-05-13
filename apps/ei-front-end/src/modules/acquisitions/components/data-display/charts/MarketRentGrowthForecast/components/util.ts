import { getChartDateFromString } from "@/commons/utils/charts";
import { MarketRentGrowthAndForecastCharts } from "@/modules/acquisitions/typings/market-analytics";
import { marketRentGrowthAndForecastChartLabels } from "@/modules/acquisitions/utils/charts";

interface GetForecastDataParams {
  data: MarketRentGrowthAndForecastCharts;
  forecast: typeof marketRentGrowthAndForecastChartLabels[number];
}
export const getForecastData = ({ data, forecast }: GetForecastDataParams) => {
  if (!forecast || !data) return [];

  const forecastItem = data.find((item) => item?.label === forecast);
  if (!forecastItem) return [];

  return (
    forecastItem?.value
      ?.map((item) => {
        return getChartDateFromString({
          chartData: {
            x: item.x,
            y: item.y * 100,
          },
          dateKey: "x",
        });
      })
      .sort((a, b) => a.x - b.x) || []
  );
};
