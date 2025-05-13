import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericFilterPayload } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { useFundGavBy } from "@/modules/assets/services/queries/funds";
import { fundGavGroupByOptions } from "@/modules/assets/utils/funds";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { Loader, Select } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

type ByOptions = typeof fundGavGroupByOptions[number];
const GavChart = dynamic(() => import("./component/GAVBreakdownPieChart"), {
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
interface GAVBreakdownChartProps {
  filters: GenericFilterPayload;
  className?: string;
  onClick?: (filteringKey: GenericFilterPayload) => void;
}

export const GAVBreakdownChart: FC<GAVBreakdownChartProps> = ({
  filters,
  className,
  onClick,
}) => {
  const prefix = "asset-portfolio-page__gav-chart";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const byOptions = fundGavGroupByOptions?.map((option) => ({
    label: convertToTitleCase(option),
    value: option,
  })) as { label: ByOptions; value: ByOptions }[];

  const [filterBy, setFilterBy] = useState<ByOptions>(byOptions[1].value);

  const { data, isLoading, isRefetching } = useFundGavBy({
    filters: {
      ...filters,
      fund: filters?.fund as string,
      group_by: filterBy,
    },
  });

  return (
    <CardWithHeader
      title="Portfolio GAV Breakdown by"
      icon={<ChartPieIcon />}
      skeletonHeight={350}
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={getClasses()}
      loaderKind="chart"
      headerActions={
        <Select
          className="asset-gav-chart__select-filter"
          options={byOptions}
          defaultValue={byOptions[1]}
          onChange={(option) => {
            setFilterBy(option?.value);
            onClick?.({});
          }}
        />
      }
      hasDataToShow={data?.length > 0}
    >
      <GavChart
        id="pie-gav-chart"
        data={data}
        onClick={(filteringKey) => {
          const keyMapping = {
            status: "status",
            region: "region",
            assets: "yardi_property_code",
          };
          const key = keyMapping[filterBy];
          filterBy !== "status" &&
            key &&
            onClick?.({
              [key]: filteringKey,
            });
        }}
      />
    </CardWithHeader>
  );
};
