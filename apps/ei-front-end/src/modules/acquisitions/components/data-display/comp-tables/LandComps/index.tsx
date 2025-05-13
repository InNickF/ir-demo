import { usePagination } from "@/commons/hooks/usePagination";
import {
  LandComp,
  LandCompTotals,
} from "@/acquisitions/typings/market-analytics";
import { defaultPaginatedData } from "@/commons/utils";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { CompsCard } from "../CompsCard";
import { CompProps } from "../types";
import { LandCompsTable } from "./components/LandCompsTable";

export const LandComps: FC<CompProps> = ({
  filters,
  useQuery,
  useQueryTotals,
  onMainAction,
  mainActionText = "Add a new land comp",
  title = "Land Comps",
  icon = <Square3Stack3DIcon />,
  tableActions,
  className,
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const type = "land";
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useQuery<LandComp>({
    page: page.toString(),
    ordering,
    type,
    ...filters,
  });
  const { data: totals, isLoading: isLoadingTotals } =
    useQueryTotals<LandCompTotals>({
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
      <LandCompsTable
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
