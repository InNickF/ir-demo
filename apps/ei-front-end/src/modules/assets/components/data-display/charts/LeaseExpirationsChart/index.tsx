import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { GetFundLeaseExpirationFilters } from "@/modules/assets/services/api/funds";
import { useGetFundLeaseExpiration } from "@/modules/assets/services/queries/funds";
import { fundLeaseExpirationFormatter } from "@/modules/assets/utils/formatters/funds";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import "./styles.css";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

interface LeaseExpirationsChartProps
  extends Omit<CardWithHeaderProps, "title" | "icon"> {
  filters?: GetFundLeaseExpirationFilters;
  fundFilter?: string;
}

const GenericStackedChart = dynamic(
  () => import("@/commons/components/data-display/charts/GenericStackedChart"),
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

export const LeaseExpirationsChart: FC<LeaseExpirationsChartProps> = ({
  filters,
  className,
  ...props
}) => {
  const prefix = "asset-portfolio-page__lease-chart";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { data, isLoading, isRefetching } = useGetFundLeaseExpiration({
    filters,
  });

  const transformedData = useMemo(() => {
    return data
      ?.map((item) =>
        item?.value?.map((property) => ({
          ...property,
          year: item?.label,
          // format metadata using leaseExpirationPortraitFormatter
          metadata: Object.fromEntries(
            Object.entries(property?.metadata).map(([key, value]) => [
              key,
              fundLeaseExpirationFormatter.format({
                key: key as keyof typeof property["metadata"],
                value,
              }),
            ])
          ),
        }))
      )
      .flat();
  }, [data]);

  return (
    <CardWithHeader
      className={getClasses()}
      icon={<ChartPieIcon />}
      skeletonHeight={500}
      title="Lease Expiration"
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={data?.length > 0}
      loaderKind="chart"
      {...props}
    >
      <GenericStackedChart
        id="stacking-lease-chart"
        data={transformedData}
        nameAccessor="label"
        xAccessor="year"
        yAccessor="value"
      />
    </CardWithHeader>
  );
};
