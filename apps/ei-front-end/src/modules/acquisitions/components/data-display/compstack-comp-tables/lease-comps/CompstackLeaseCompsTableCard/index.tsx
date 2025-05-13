import { usePagination } from "@/commons/hooks/usePagination";
import { defaultPaginatedData } from "@/commons/utils";
import { useCompstackLeaseComps } from "@/modules/acquisitions/services/queries/market-analytics";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { CompstackCompTableCard } from "../../CompstackCompTableCard";
import { CompstackCompsTableCardProps } from "../../types";
import { CompstackLeaseCompsTable } from "../CompstackLeaseCompsTable";

export const CompstackLeaseCompsTableCard: FC<CompstackCompsTableCardProps> = ({
  title = "Lease Comps",
  icon = <ArrowDownTrayIcon />,
  tableActions,
  className,
  extraFilters,
  ...props
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const isFilteringByMarket = "market" in props;
  const filtersBy = isFilteringByMarket
    ? { market: props?.market }
    : {
        submarket: props?.submarket,
        include_neighbors: "true",
      };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useCompstackLeaseComps({
    page: page.toString(),
    ordering,
    ...extraFilters,
    ...filtersBy,
  });

  return (
    <CompstackCompTableCard
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={className}
    >
      <CompstackLeaseCompsTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        data={data.results}
        page={page}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
        tableActions={tableActions}
      />
    </CompstackCompTableCard>
  );
};
