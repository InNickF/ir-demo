import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericXYDateMultilineToChart } from "@/commons/typings/charts";
import {
  numberToDollar,
  numberToScaledPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { getChartDateFromString } from "@/commons/utils/charts";
import {
  TotalDistributionActualLineChartFilters,
  TotalDistributionBudgetLineChartFilters,
} from "@/modules/assets/services/api/investing-performance";
import { TotalDistributionActualVsBudgetChart } from "@/modules/assets/typings/investing-performance";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { UseQueryResult } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { CommonInvestingPerformanceCardProps } from "../types";
import {
  ComparisonValues,
  ComparisonValuesProps,
} from "./components/ComparisonValues";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const MultilineChart = dynamic(
  () =>
    import(
      "@/commons/components/data-display/charts/GenericMultilineDateChart"
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

interface TotalDistributionsBudgetVsActualProps
  extends Omit<
    CommonInvestingPerformanceCardProps<
      TotalDistributionActualVsBudgetChart[],
      TotalDistributionActualLineChartFilters &
        TotalDistributionBudgetLineChartFilters
    >,
    "useQuery"
  > {
  useActualQuery: (
    filters: TotalDistributionActualLineChartFilters
  ) => UseQueryResult<TotalDistributionActualVsBudgetChart[], unknown>;
  useBudgetQuery: (
    filters: TotalDistributionBudgetLineChartFilters
  ) => UseQueryResult<TotalDistributionActualVsBudgetChart[], unknown>;
}
export const TotalDistributionsBudgetVsActual: FC<
  TotalDistributionsBudgetVsActualProps
> = ({
  filters,
  title = "Total Distributions - Budget vs Actual",
  icon = <ChartBarIcon />,
  useActualQuery,
  useBudgetQuery,
  ...props
}) => {
  const {
    data: actualData,
    isLoading: isLoadingActual,
    isRefetching: isRefetchingActual,
  } = useActualQuery(filters);
  const {
    data: budgetData,
    isLoading: isLoadingBudget,
    isRefetching: isRefetchingBudget,
  } = useBudgetQuery(filters);

  const formattedData: GenericXYDateMultilineToChart[] = useMemo(
    () => [
      {
        label: "Actual",
        value:
          actualData
            ?.map((item) => {
              return getChartDateFromString({
                chartData: item,
                dateKey: "x",
              });
            })
            .sort((a, b) => a.x - b.x) || [],
      },
      {
        label: "Budget",
        value:
          budgetData
            ?.map((item) => {
              return getChartDateFromString({
                chartData: item,
                dateKey: "x",
              });
            })
            .sort((a, b) => a.x - b.x) || [],
      },
    ],
    [actualData, budgetData]
  );
  const comparisonValues: ComparisonValuesProps["data"] = useMemo(
    () => [
      [
        {
          label: "Actual",
          value: numberToDollar({
            value: actualData?.at(-1)?.y,
            options: {
              minimumFractionDigits: 0,
            },
          }),
        },
        {
          label: "Budget",
          value: numberToDollar({
            value: budgetData?.at(-1)?.y,
            options: {
              minimumFractionDigits: 0,
            },
          }),
        },
      ],
      [
        {
          label: "Diff",
          value: numberToDollar({
            value: actualData?.at(-1)?.y - budgetData?.at(-1)?.y,
            options: {
              minimumFractionDigits: 0,
            },
          }),
        },
        {
          label: "Diff %",
          value: numberToScaledPercent({
            value:
              (actualData?.at(-1)?.y - budgetData?.at(-1)?.y) /
              budgetData?.at(-1)?.y,
            options: {
              minimumFractionDigits: 0,
            },
          }),
        },
      ],
    ],
    [actualData, budgetData]
  );

  const isLoading = isLoadingActual || isLoadingBudget;
  const isRefetching = isRefetchingActual || isRefetchingBudget;
  const hasDataToShow = !!actualData?.length || !!budgetData?.length;
  return (
    <CardWithHeader
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={hasDataToShow}
      {...props}
    >
      <ComparisonValues data={comparisonValues} />
      <MultilineChart
        data={formattedData}
        hasBullets={false}
        seriesOptions={{
          autoGapCount: 24,
        }}
        yValueFormat="$#.0a"
        id="property-total-distributions-budget-vs-actual"
      />
    </CardWithHeader>
  );
};
