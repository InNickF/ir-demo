import { CompstackCompTableCard } from "@/acquisitions/components/data-display/compstack-comp-tables/CompstackCompTableCard";
import { CompstackSaleCompsTable } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/sale-comps/CompstackSaleCompsTable";
import { CompstackSaleCompsTotalRows } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/sale-comps/CompstackSaleCompsTotalRows";
import { useDealCompstackSaleComps } from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { DealMarketAnalyticsCompsProps } from "../types";

export const DealCompstackSaleCompTable: FC<DealMarketAnalyticsCompsProps> = ({
  title = "Linked Sale Comps",
  icon = <TableCellsIcon />,
  tableActions,
  className,
  dealId,
  isRefetching,
  headerActions,
}) => {
  const [ordering, setOrdering] = useState("");

  const {
    data = [],
    isLoading,
    isFetched,
    isRefetching: isRefetchingSaleComps,
  } = useDealCompstackSaleComps({
    dealId,
    filters: {
      ordering,
    },
  });

  const refetching = isRefetchingSaleComps || isRefetching;

  const isEmpty = data.length === 0 && !isLoading && isFetched;

  return !isEmpty ? (
    <CompstackCompTableCard
      icon={icon}
      title={title}
      isLoading={isLoading}
      isRefetching={refetching}
      className={className}
      headerActions={headerActions}
    >
      <CompstackSaleCompsTable
        isLoading={isLoading}
        data={data}
        tableActions={tableActions}
        ordering={ordering}
        setOrdering={setOrdering}
        totalRows={<CompstackSaleCompsTotalRows dealId={dealId} />}
      />
    </CompstackCompTableCard>
  ) : null;
};
