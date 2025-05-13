import { useCompstackLandCompsTrend } from "@/acquisitions/services/queries/market-analytics";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { CompstackCompsTrendChartProps } from "../types";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const CompstackCompTrendChart = dynamic(
  () =>
    import(
      "@/acquisitions/components/data-display/charts/GenericCompstackCompTrendChart"
    ),
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

export const CompstackLandCompsTrendChart: FC<
  CompstackCompsTrendChartProps
> = ({
  onAmountBulletClick,
  headerActions,
  title = "Land Comps Trend",
  filters,
  ...props
}) => {
  const isFilteringByMarket = "market" in props;
  const filtersBy = isFilteringByMarket
    ? { market: props?.market }
    : {
        submarket: props?.submarket,
        include_neighbors: "true",
      };

  const {
    data = [],
    isLoading,
    isRefetching,
  } = useCompstackLandCompsTrend({
    ...filtersBy,
    ...filters,
  });

  const hasData = data?.length > 0;
  return (
    <CardWithHeader
      title={title}
      icon={<ChartBarSquareIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      headerActions={headerActions}
      skeletonHeight={350}
      {...props}
    >
      <div>
        {hasData ? (
          <CompstackCompTrendChart
            id="acq-compstack-land-comps-trend-chart"
            data={data}
            onBulletClick={onAmountBulletClick || (() => null)}
          />
        ) : (
          <NoDataOnChartMessage />
        )}
      </div>
    </CardWithHeader>
  );
};
