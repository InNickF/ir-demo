import { useDealsBy } from "@/acquisitions/services/queries/deals";
import { useDealsByFilters } from "@/acquisitions/services/queries/filters";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";
import { CardProps, Loader, Select, Skeleton } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const DealsByChart = dynamic(() => import("./component/DealsByChart"), {
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
});

interface DealsByProps extends CardProps {
  filters: GenericFilterPayload;
}

export const DealsBy: FC<DealsByProps> = ({ filters, ...props }) => {
  const { data: dealsByFilters = [], isLoading: isFiltersLoading } =
    useDealsByFilters();

  const formattedFilters = dealsByFilters.length
    ? dealsByFilters[0].options
    : [];

  const [dealsBy, setDealsBy] = useState<GenericFilterPayload>();

  const { data, isLoading, isRefetching } = useDealsBy({
    filters: { ...filters, ...dealsBy },
    enabled: !!dealsBy,
  });

  const selectSkeletonClasses = "h-10 w-32";

  const getDealsBy = () => {
    if (typeof dealsBy?.by === "string") {
      return dealsBy.by;
    }
    return dealsBy?.by?.[0];
  };

  return (
    <CardWithHeader
      title="Deals by"
      icon={<DocumentChartBarIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={!!data?.length}
      headerActions={
        isFiltersLoading ? (
          <Skeleton className={selectSkeletonClasses}>
            <Skeleton.Text className={selectSkeletonClasses} />
          </Skeleton>
        ) : (
          <SelectFilter
            filters={formattedFilters}
            changeFilter={(value) => setDealsBy(value)}
          />
        )
      }
      {...props}
    >
      <DealsByChart id="dealsByChart" data={data} by={getDealsBy()} />
    </CardWithHeader>
  );
};

const SelectFilter = ({ filters, changeFilter }) => {
  useEffect(() => {
    changeFilter({ by: filters?.[0]?.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      color="over-ghost"
      className="acq-deals-by__header__select"
      options={filters}
      defaultValue={filters?.[0]}
      onChange={(option) => {
        changeFilter({ by: option.value });
      }}
    />
  );
};
