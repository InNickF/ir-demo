import { useHistoricalMarketStatisticsChart } from "@/acquisitions/services/queries/market-analytics";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { getChartDateFromStringQuarter } from "@/commons/utils/charts";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import {
  ButtonGroup,
  CardProps,
  FiltersPayloadType,
  Loader,
} from "in-ui-react";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { useSupplyConstrainedScoreFilter } from "./hooks/useSupplyConstrainedScoreFilter";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const DateBasedLineChart = dynamic(
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

interface SupplyConstrainedScoreProps extends CardProps {
  market: string;
  filters: FiltersPayloadType;
}
export const SupplyConstrainedScore: FC<SupplyConstrainedScoreProps> = ({
  market,
  className,
  filters,
  ...props
}) => {
  const {
    supplyConstrainedScore,
    supplyConstrainedScoreItems,
    supplyChartClasses,
    demandChartClasses,
  } = useSupplyConstrainedScoreFilter();
  const {
    data: demandData = [],
    isLoading: isLoadingDemand,
    isRefetching: isRefetchingDemand,
  } = useHistoricalMarketStatisticsChart({
    market: market,
    type: "demand-resiliency",
    ...filters,
  });
  const demandDataFormattedData = useMemo(
    () =>
      demandData.map((item) => {
        return getChartDateFromStringQuarter({
          chartData: item,
          dateKey: "x",
        });
      }),
    [demandData]
  );
  const {
    data: supplyData = [],
    isLoading: isLoadingSupply,
    isRefetching: isRefetchingSupply,
  } = useHistoricalMarketStatisticsChart({
    market: market,
    type: "supply-constrained",
    ...filters,
  });
  const supplyDataFormattedData = useMemo(
    () =>
      supplyData.map((item) => {
        return getChartDateFromStringQuarter({
          chartData: item,
          dateKey: "x",
        });
      }),
    [supplyData]
  );

  const isLoading = isLoadingDemand || isLoadingSupply;
  const isRefetching = isRefetchingDemand || isRefetchingSupply;
  const hasDemandData = demandDataFormattedData.length > 0;
  const hasSupplyData = supplyDataFormattedData.length > 0;

  const getClasses = (): string => {
    const classes = ["acq-supply-constrained-score--header-no-b-padding"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <CardWithHeader
      title={
        supplyConstrainedScore === "supply"
          ? "Supply Risk Score"
          : "Demand Risk Score"
      }
      className={getClasses()}
      icon={<ChartBarSquareIcon />}
      headerActions={
        <ButtonGroup
          active={supplyConstrainedScore}
          items={supplyConstrainedScoreItems}
        />
      }
      isLoading={isLoading}
      isRefetching={isRefetching}
      {...props}
    >
      <div className="relative">
        <div className={supplyChartClasses}>
          {hasSupplyData ? (
            <DateBasedLineChart
              id="acq-supply-scores-chart"
              data={supplyDataFormattedData}
            />
          ) : (
            <NoDataOnChartMessage />
          )}
        </div>
        <div className={demandChartClasses}>
          {hasDemandData ? (
            <DateBasedLineChart
              id="acq-demand-scores-chart"
              data={demandDataFormattedData}
            />
          ) : (
            <NoDataOnChartMessage />
          )}
        </div>
      </div>
    </CardWithHeader>
  );
};
