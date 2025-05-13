import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import {
  OperationalFinancialPerformanceChart as OperationalFinancialPerformanceChartType,
  OperationalFinancialPerformanceComparison,
} from "@/modules/assets/typings/operational-financial-performance";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, Loader } from "in-ui-react";
import dynamic from "next/dynamic.js";
import { FC } from "react";
import {
  OFPHistoricalChartButtonFilters,
  OFPSelectedMetric,
} from "../../types";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const OperationalFinancialPerformanceHistoricalChartElement = dynamic(
  () =>
    import(
      "./components/OperationalFinancialPerformanceHistoricalChartElement"
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

interface OperationalFinancialPerformanceHistoricalChartProps
  extends IsLoadingProp,
    IsRefetchingProp,
    OFPHistoricalChartButtonFilters,
    Pick<OFPSelectedMetric, "selectedMetric"> {
  className?: string;
  data: OperationalFinancialPerformanceChartType[];
  activeComparison: OperationalFinancialPerformanceComparison;
}

export const OperationalFinancialPerformanceHistoricalChart: FC<
  OperationalFinancialPerformanceHistoricalChartProps
> = ({
  className,
  selectedMetric,
  data = [],
  isLoading,
  isRefetching,
  activeHistoricalVariant,
  historicalVariantButtonFilters,
  activeComparison,
}) => {
  const prefix = "ei-operational-financial-performance__chart__element";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const selectedChartData = data?.find((item) => item.label === selectedMetric);

  const hasData = selectedChartData?.value?.[0]?.value?.length > 0;

  return (
    <CardWithHeader
      className={getClasses()}
      title={`${humanizeSnakeCase(selectedMetric)} (Historical)`}
      icon={<ChartBarIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      loaderKind="chart"
      headerActions={
        <>
          <ButtonGroup
            active={activeHistoricalVariant}
            items={historicalVariantButtonFilters}
            size="small"
          />
        </>
      }
      hasDataToShow={hasData}
    >
      <OperationalFinancialPerformanceHistoricalChartElement
        id="property-performance-line-chart"
        data={selectedChartData?.value}
        activeComparison={activeComparison}
      />
    </CardWithHeader>
  );
};
