import { useCompstackLeaseCompsTrend } from "@/acquisitions/services/queries/market-analytics";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericLabelValueObject } from "@/commons/typings";
import {
  CompstackLeaseCompsTrendChartXAxisSchema,
  CompstackLeaseCompsTrendChartYAxisSchema,
} from "@/modules/acquisitions/schemas/market-analytics";
import { CompstackLeaseCompsTrendChartAxisFilters } from "@/modules/acquisitions/services/api/market-analytics";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { NoDataOnChartMessage } from "../../NoDataOnChartMessage";
import { CompstackCompsTrendChartProps } from "../types";
import { CompstackLeaseCompsTrendChartFilters } from "./components/CompstackLeaseCompsTrendChartFilters";
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
const kindOptions: GenericLabelValueObject<
  typeof CompstackLeaseCompsTrendChartXAxisSchema
>[] = [
  { label: "Execution Date", value: "execution_date" },
  { label: "Commencement Date", value: "commencement_date" },
];

const timeOptions: GenericLabelValueObject<
  typeof CompstackLeaseCompsTrendChartYAxisSchema
>[] = [
  { label: "Annual", value: "annual_starting_rent" },
  { label: "Monthly", value: "monthly_starting_rent" },
];
export const CompstackLeaseCompsTrendChart: FC<
  CompstackCompsTrendChartProps
> = ({
  onAmountBulletClick,
  headerActions,
  title = "Lease Comps Trend",
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

  const [amountFilters, setAmountFilters] =
    useState<CompstackLeaseCompsTrendChartAxisFilters>({
      x_axis: kindOptions[0].value,
      y_axis: timeOptions[0].value,
    });

  const {
    data = [],
    isLoading,
    isRefetching,
  } = useCompstackLeaseCompsTrend({
    ...amountFilters,
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
      headerActions={
        <>
          <CompstackLeaseCompsTrendChartFilters
            kindOptions={kindOptions}
            timeOptions={timeOptions}
            onFiltering={(filter) => {
              setAmountFilters((prev) => ({ ...prev, ...filter }));
            }}
          />
          {headerActions}
        </>
      }
      skeletonHeight={350}
      {...props}
    >
      <div>
        {hasData ? (
          <CompstackCompTrendChart
            id="acq-compstack-lease-comps-trend-chart"
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
