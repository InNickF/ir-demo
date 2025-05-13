import { GetAssetLeaseExpirationPortraitFilters } from "@/assets/services/api/properties";
import { useGetAssetLeaseExpirationPortrait } from "@/assets/services/queries/properties";
import { leaseExpirationPortraitFormatter } from "@/assets/utils/formatters/properties";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import "./styles.css";
import { Loader } from "in-ui-react";
import { Loader3D } from "@/commons/components/3d/Loader3D";

interface LeaseExpirationPortraitProps {
  filters: GetAssetLeaseExpirationPortraitFilters;
  className?: string;
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

export const LeaseExpirationPortrait: FC<LeaseExpirationPortraitProps> = ({
  className,
  filters,
}) => {
  const { data, isLoading, isRefetching } = useGetAssetLeaseExpirationPortrait({
    filters,
  });

  const transformedData = useMemo(() => {
    return data
      ?.map((item) =>
        item?.value?.map((property) => ({
          ...property,
          year: item?.label,
          metadata: Object.fromEntries(
            Object.entries(property?.metadata).map(([key, value]) => [
              key,
              leaseExpirationPortraitFormatter.format({
                key: key as keyof typeof property["metadata"],
                value,
              }),
            ])
          ),
        }))
      )
      .flat();
  }, [data]);

  const prefix = "asset-portfolio-page__lease-expiration-chart";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      className={getClasses()}
      title="Lease Expiration Portrait"
      icon={<PresentationChartBarIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      padding={false}
      hasDataToShow={!!transformedData?.length}
      loaderKind="chart"
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
