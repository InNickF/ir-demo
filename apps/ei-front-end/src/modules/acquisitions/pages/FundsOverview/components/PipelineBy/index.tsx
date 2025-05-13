import { FC, useEffect, useState } from "react";
import { CardProps, Loader, Select, Skeleton } from "in-ui-react";
import { LegendArrow } from "@/commons/components/data-display/LegendArrow";
import dynamic from "next/dynamic";
import { GenericFilterPayload } from "@/commons/typings";
import { usePipelineByFilters } from "@/acquisitions/services/queries/filters";
import { usePipelineBy } from "@/acquisitions/services/queries/deals";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import "./styles.css";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const PipelineByChart = dynamic(() => import("./components/PipelineByChart"), {
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
interface PipelineByProps extends CardProps {
  filters: GenericFilterPayload;
}
export const PipelineBy: FC<PipelineByProps> = ({ filters, ...props }) => {
  const selectSkeletonClasses = "h-10 w-32";

  const { data: pipelineByFilters = [], isLoading: isFiltersLoading } =
    usePipelineByFilters();

  const formattedFilters = pipelineByFilters.length
    ? pipelineByFilters[0].options
    : [];

  const [pipelineBy, setPipelineBy] = useState<GenericFilterPayload>();

  const { data, isLoading, isRefetching } = usePipelineBy({
    filters: { ...pipelineBy, ...filters },
    enabled: !!pipelineBy,
  });

  const getPipelineBy = () => {
    if (typeof pipelineBy?.by === "string") {
      return pipelineBy.by;
    }
    return pipelineBy?.by?.[0];
  };

  return (
    <CardWithHeader
      title="Pipeline by"
      icon={<BanknotesIcon />}
      isLoading={isFiltersLoading || isLoading}
      isRefetching={isRefetching}
      loaderKind="chart"
      headerActions={
        <>
          {isFiltersLoading ? (
            <Skeleton className={selectSkeletonClasses}>
              <Skeleton.Text className={selectSkeletonClasses} />
            </Skeleton>
          ) : (
            <>
              <SelectFilter
                filters={formattedFilters}
                changeFilter={(value) => setPipelineBy(value)}
              />
              {pipelineBy ? (
                <LegendArrow upText={getPipelineBy()} rightText="Phase" />
              ) : null}
            </>
          )}
        </>
      }
      hasDataToShow={!!data?.length}
      {...props}
    >
      <PipelineByChart id="pipelineByChart" data={data} by={getPipelineBy()} />
    </CardWithHeader>
  );
};

const SelectFilter = ({
  filters,
  changeFilter,
}: {
  filters: GenericFilterPayload[];
  changeFilter: (value: GenericFilterPayload) => void;
}) => {
  useEffect(() => {
    changeFilter({ by: filters?.[1]?.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      color="over-ghost"
      className="acq-deals-by__header__select"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={filters as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValue={filters?.[1] as any}
      onChange={(option) => {
        changeFilter({ by: option.value });
      }}
    />
  );
};
