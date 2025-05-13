import { useHistoricalMarketOrSubMarketStatisticsChart } from "@/acquisitions/services/queries/market-analytics";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { readableNumber } from "@/commons/model-in/formatters/utils/amount-conversions";
import { getChartDateFromStringQuarter } from "@/commons/utils/charts";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { CurrentValueChartHeader } from "../CurrentValueChartHeader";
import { MarketAnalyticsChartProps } from "../types";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const SupplyGrowthChart = dynamic(
  () => import("@/commons/components/data-display/charts/GenericDateLineChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-96">
        <Loader3D
          kind="chart"
          style={{
            minHeight: 350,
          }}
          isLoading
          localIsLoading
          onChangeIsLoading={() => null}
        />
      </div>
    ),
  }
);

export const SupplyGrowth: FC<MarketAnalyticsChartProps> = ({
  headerActions,
  filters,
  ...props
}) => {
  const isFilteringByMarket = "market" in props;
  const filtersBy = isFilteringByMarket
    ? {
        market: props?.market,
      }
    : {
        submarket: props?.submarket,
      };

  const {
    data = [],
    isLoading,
    isRefetching,
  } = useHistoricalMarketOrSubMarketStatisticsChart({
    ...filtersBy,
    ...filters,
    type: "supply-growth",
  });
  const formattedData = useMemo(
    () =>
      data
        .map((item) => {
          return getChartDateFromStringQuarter({
            chartData: item,
            dateKey: "x",
          });
        })
        .sort((a, b) => a.x - b.x),
    [data]
  );
  const hasData = formattedData.length > 0;
  return (
    <CardWithHeader
      title="Supply Growth"
      icon={<ChartBarSquareIcon />}
      headerActions={
        <CurrentValueChartHeader
          value={
            hasData
              ? readableNumber(formattedData[formattedData.length - 1].y)
              : null
          }
          headerActions={headerActions}
        />
      }
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <div>
        {hasData ? (
          <SupplyGrowthChart
            id="acq-supply-growth-chart"
            data={formattedData}
          />
        ) : (
          <NoDataOnChartMessage />
        )}
      </div>
    </CardWithHeader>
  );
};
