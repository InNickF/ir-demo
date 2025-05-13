import { NetContributionDistributionChartFilters } from "@/modules/assets/services/api/investing-performance";
import { NetContributionDistributionChart } from "@/modules/assets/typings/investing-performance";
import { FC, useMemo } from "react";
import { CommonInvestingPerformanceCardProps } from "../types";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import dynamic from "next/dynamic";
import { getChartDateFromString } from "@/commons/utils/charts";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const NetContributionsAndDistributionsChart = dynamic(
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

export const NetContributionsAndDistributions: FC<
  CommonInvestingPerformanceCardProps<
    NetContributionDistributionChart[],
    NetContributionDistributionChartFilters
  >
> = ({
  useQuery,
  filters,
  title = "Net Contributions / Distributions",
  icon = <ChartBarIcon />,
  ...props
}) => {
  const { data, isLoading, isRefetching } = useQuery(filters);
  const formattedData = useMemo(
    () =>
      data
        ?.map((item) => {
          return getChartDateFromString({
            chartData: item,
            dateKey: "x",
          });
        })
        .sort((a, b) => a.x - b.x) || [],
    [data]
  );
  return (
    <CardWithHeader
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={!!data?.length}
      loaderKind="chart"
      {...props}
    >
      <div className="flex justify-between px-1">
        <p>Actual:</p>
        <p>
          {numberToDollar({
            value: formattedData?.at(-1)?.y,
            options: {
              minimumFractionDigits: 0,
            },
          })}
        </p>
      </div>
      <NetContributionsAndDistributionsChart
        smoothed
        data={formattedData}
        hasBullets={false}
        seriesName="Actual"
        seriesOptions={{
          tension: 0,
          autoGapCount: 24,
        }}
        yValueFormat="$#.0a"
        id="property-net-contributions-and-distributions-chart"
      />
    </CardWithHeader>
  );
};
