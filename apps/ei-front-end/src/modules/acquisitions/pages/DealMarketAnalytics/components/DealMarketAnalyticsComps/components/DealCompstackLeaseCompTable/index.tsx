import { CompstackCompTableCard } from "@/acquisitions/components/data-display/compstack-comp-tables/CompstackCompTableCard";
import { CompstackLeaseCompsTable } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/lease-comps/CompstackLeaseCompsTable";
import { CompstackLeaseCompsTotalRows } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/lease-comps/CompstackLeaseCompsTotalRows";
import { useDealCompstackLeaseComps } from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { DealMarketAnalyticsCompsProps } from "../types";

export const DealCompstackLeaseCompTable: FC<DealMarketAnalyticsCompsProps> = ({
  title = "Linked Lease Comps",
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
    isRefetching: isRefetchingLeaseComps,
  } = useDealCompstackLeaseComps({
    dealId,
    filters: {
      ordering,
    },
  });

  const refetching = isRefetchingLeaseComps || isRefetching;

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
      <CompstackLeaseCompsTable
        isLoading={isLoading}
        data={data}
        tableActions={tableActions}
        ordering={ordering}
        setOrdering={setOrdering}
        totalRows={<CompstackLeaseCompsTotalRows dealId={dealId} />}
      />
    </CompstackCompTableCard>
  ) : null;
};
