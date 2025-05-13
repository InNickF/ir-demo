import { defaultPaginatedData } from "@/commons/utils";
import { usePagination } from "@/commons/hooks/usePagination";
import {
  TransitionalProperty,
  TransitionalPropertyTotals,
} from "@/acquisitions/typings/market-analytics";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { CompsCard } from "../CompsCard";
import { CompProps } from "../types";
import { TransactionalPropertiesTable } from "./components/TransactionalPropertiesTable";

export const TransitionalProperties: FC<CompProps> = ({
  filters,
  onMainAction,
  mainActionText = "Add a new transitional property",
  title = "Transitional Properties",
  icon = <ChevronDoubleRightIcon />,
  tableActions,
  useQuery,
  useQueryTotals,
  className,
}) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const type = "transitional_property";
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useQuery<TransitionalProperty>({
    page: page.toString(),
    ordering,
    type,
    ...filters,
  });
  const { data: totals, isLoading: isLoadingTotals } =
    useQueryTotals<TransitionalPropertyTotals>({
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
      <TransactionalPropertiesTable
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
