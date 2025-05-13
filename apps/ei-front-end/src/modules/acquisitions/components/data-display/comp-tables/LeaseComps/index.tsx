import { defaultPaginatedData } from "@/commons/utils";
import { usePagination } from "@/commons/hooks/usePagination";
import {
  LeaseComp,
  LeaseCompTotals,
} from "@/acquisitions/typings/market-analytics";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { CompsCard } from "../CompsCard";
import { CompProps } from "../types";
import { LeaseCompTable } from "./components/LeaseCompTable";

export const LeaseComps: FC<CompProps> = ({
  filters,
  onMainAction,
  mainActionText = "Add a new Lease Comp",
  title = "Lease Comps",
  icon = <ArrowDownTrayIcon />,
  tableActions,
  useQuery,
  useQueryTotals,
  className,
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const type = "lease";
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useQuery<LeaseComp>({
    page: page.toString(),
    ordering,
    type,
    ...filters,
  });
  const { data: totals, isLoading: isLoadingTotals } =
    useQueryTotals<LeaseCompTotals>({
      type,
    });

  return (
    <CompsCard
      actionText={mainActionText}
      icon={icon}
      onAction={onMainAction}
      title={title}
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={className}
    >
      <LeaseCompTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        data={data.results}
        totals={totals}
        isLoadingTotals={isLoadingTotals}
        page={page}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
        tableActions={tableActions}
      />
    </CompsCard>
  );
};
