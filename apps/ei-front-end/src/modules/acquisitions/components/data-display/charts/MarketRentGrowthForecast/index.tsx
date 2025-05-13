import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useMarketRentGrowthAndForecastChart } from "@/modules/acquisitions/services/queries/market-analytics";
import {
  FiltersByMarket,
  FiltersBySubMarket,
} from "@/modules/acquisitions/typings/market-analytics";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { CardProps, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import "./styles.css";
import { GenericFilterPayload } from "@/commons/typings";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const MarketRentGrowthForecastChart = dynamic(
  () => import("./components/MarketRentGrowthForecastChart"),
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

interface MarketRentGrowthForecastPropsBase extends CardProps {
  filters?: GenericFilterPayload;
}
interface MarketRentGrowthForecastPropsByMarket
  extends FiltersByMarket,
    MarketRentGrowthForecastPropsBase {}
interface MarketRentGrowthForecastPropsBySubMarket
  extends FiltersBySubMarket,
    MarketRentGrowthForecastPropsBase {}

type MarketRentGrowthForecastProps =
  | MarketRentGrowthForecastPropsByMarket
  | MarketRentGrowthForecastPropsBySubMarket;
export const MarketRentGrowthForecast: FC<MarketRentGrowthForecastProps> = ({
  filters,
  ...props
}) => {
  const isFilteringByMarket = "market" in props;
  const filtersBy = isFilteringByMarket
    ? { market: props?.market }
    : {
        submarket: props?.submarket,
      };

  const { data, isLoading, isRefetching } = useMarketRentGrowthAndForecastChart(
    {
      type: "market-rent",
      ...filtersBy,
      ...filters,
    }
  );

  const hasData = data?.some((item) => item?.value.length > 0);

  return (
    <CardWithHeader
      title="Market Rent Growth Forecast"
      icon={<ChartBarSquareIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      {...props}
    >
      {hasData ? (
        <MarketRentGrowthForecastChart
          id="acq-market-rent-growth-forecast-chart"
          data={data}
        />
      ) : (
        <NoDataOnChartMessage />
      )}
    </CardWithHeader>
  );
};
