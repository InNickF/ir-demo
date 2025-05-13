import { CompstackCompTableCard } from "@/acquisitions/components/data-display/compstack-comp-tables/CompstackCompTableCard";
import { CompstackLandCompsTable } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/land-comps/CompstackLandCompsTable";
import { CompstackLandCompsTotalRows } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/land-comps/CompstackLandCompsTotalRows";
import { useDealCompstackLandComps } from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { DealMarketAnalyticsCompsProps } from "../types";

export const DealCompstackLandCompTable: FC<DealMarketAnalyticsCompsProps> = ({
  title = "Linked Land Comps",
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
    isRefetching: isRefetchingLandComps,
  } = useDealCompstackLandComps({
    dealId,
    filters: {
      ordering,
    },
  });

  const refetching = isRefetchingLandComps || isRefetching;

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
      <CompstackLandCompsTable
        isLoading={isLoading}
        data={data}
        tableActions={tableActions}
        ordering={ordering}
        setOrdering={setOrdering}
        totalRows={<CompstackLandCompsTotalRows dealId={dealId} />}
      />
    </CompstackCompTableCard>
  ) : null;
};
