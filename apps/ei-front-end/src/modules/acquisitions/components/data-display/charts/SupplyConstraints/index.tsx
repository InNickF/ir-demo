import { useHistoricalMarketStatisticsChartSupplyVSDemand } from "@/acquisitions/services/queries/market-analytics";
import { LegendArrow } from "@/commons/components/data-display/LegendArrow";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { CardProps, FiltersPayloadType, Loader } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const SupplyConstraintsChart = dynamic(
  () => import("./components/SupplyConstraintsChart"),
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
interface SupplyConstraintsProps extends CardProps {
  market: string;
  filters: FiltersPayloadType;
}
export const SupplyConstraints: FC<SupplyConstraintsProps> = ({
  market,
  filters,
  ...props
}) => {
  const {
    data = [],
    isLoading,
    isRefetching,
  } = useHistoricalMarketStatisticsChartSupplyVSDemand({
    last_period: "true",
    ...filters,
  });
  const hasData = data.length > 0;
  return (
    <CardWithHeader
      title="Demand Risk Score vs. Supply Risk Score"
      icon={<ChartBarSquareIcon />}
      headerActions={
        <>
          <LegendArrow upText="Supply" rightText="Demand" />
        </>
      }
      isLoading={isLoading}
      isRefetching={isRefetching}
      {...props}
    >
      {hasData ? (
        <SupplyConstraintsChart
          id="acq-supply-constraints-chart"
          data={data}
          currentMarket={market}
        />
      ) : (
        <NoDataOnChartMessage />
      )}
    </CardWithHeader>
  );
};
