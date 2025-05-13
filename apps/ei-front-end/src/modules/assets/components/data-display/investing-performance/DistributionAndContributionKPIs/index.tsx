import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { DistributionsContributionsKPIsFilters } from "@/modules/assets/services/api/investing-performance";
import { DistributionsContributionsKPIs } from "@/modules/assets/typings/investing-performance";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { CommonInvestingPerformanceCardProps } from "../types";
import { DistributionAndContributionKPIsTable } from "./components/DistributionAndContributionKPIsTable";

export const DistributionAndContributionKPIs: FC<
  CommonInvestingPerformanceCardProps<
    DistributionsContributionsKPIs,
    DistributionsContributionsKPIsFilters
  >
> = ({
  useQuery,
  filters,
  title = "Distributions / Contributions",
  icon = <TableCellsIcon />,
  bodyPadding = false,
  ...props
}) => {
  const { data, isLoading, isRefetching } = useQuery(filters);
  return (
    <CardWithHeader
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={!!data}
      bodyPadding={bodyPadding}
      loaderKind="chart"
      {...props}
    >
      <DistributionAndContributionKPIsTable data={data} />
    </CardWithHeader>
  );
};
