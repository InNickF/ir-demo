import { defaultPaginatedData } from "@/commons/utils";
import { usePagination } from "@/commons/hooks/usePagination";
import {
  StabilizedProperty,
  StabilizedPropertyTotals,
} from "@/acquisitions/typings/market-analytics";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { CompsCard } from "../CompsCard";
import { CompProps } from "../types";
import { StabilizedPropertiesTable } from "./components/StabilizedPropertiesTable";

export const StabilizedProperties: FC<CompProps> = ({
  filters,
  useQuery,
  useQueryTotals,
  onMainAction,
  mainActionText = "Add a new stabilized property",
  title = "Stabilized Properties",
  icon = <CheckCircleIcon />,
  tableActions,
  className,
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const type = "stabilized_property";
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useQuery<StabilizedProperty>({
    page: page.toString(),
    ordering,
    type,
    ...filters,
  });
  const { data: totals, isLoading: isLoadingTotals } =
    useQueryTotals<StabilizedPropertyTotals>({
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
      <StabilizedPropertiesTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        totals={totals}
        isLoadingTotals={isLoadingTotals}
        data={data.results}
        page={page}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
        tableActions={tableActions}
      />
    </CompsCard>
  );
};
