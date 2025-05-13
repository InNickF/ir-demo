import dynamic from "next/dynamic";
import { CommonInvestingPerformanceCardProps } from "../types";
import { TotalDistributionByTypeDoughnut } from "@/modules/assets/typings/investing-performance";
import { PropertyTotalDistributionByTypeDoughnutFilters } from "@/modules/assets/services/api/investing-performance";
import { FC } from "react";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { Empty, Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const TotalDistributionsByTypePieChart = dynamic(
  () =>
    import(
      "@/commons/components/data-display/charts/GenericLabelValuePieChart"
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

export const TotalDistributionsByType: FC<
  CommonInvestingPerformanceCardProps<
    TotalDistributionByTypeDoughnut[],
    PropertyTotalDistributionByTypeDoughnutFilters
  >
> = ({
  useQuery,
  filters,
  title = "Total Distributions by Type",
  icon = <ChartPieIcon />,
  ...props
}) => {
  const { data, isLoading, isRefetching } = useQuery(filters);

  return (
    <CardWithHeader
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={data?.some((item) => item?.value > 0) && !!data}
      {...props}
    >
      {data ? (
        <TotalDistributionsByTypePieChart
          data={data}
          valueNumberFormat="$#.0a"
          id="property-total-distributions-by-type"
        />
      ) : (
        <Empty />
      )}
    </CardWithHeader>
  );
};
