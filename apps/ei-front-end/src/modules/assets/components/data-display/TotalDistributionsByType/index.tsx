import { GenericTableBody } from "@/commons/components/data-display/tables/GenericTableBody";
import { GenericTableHeader } from "@/commons/components/data-display/tables/GenericTableHeader";
import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { TableCard } from "@/commons/components/general/TableCard";
import { useLocalPagination } from "@/commons/hooks/useLocalPagination";
import { GetAssetTotalDistributionsByTypeFilters } from "@/modules/assets/services/api/properties";
import {
  useGetTotalDistributionByType,
  useGetTotalDistributionByTypeTotals,
} from "@/modules/assets/services/queries/properties";
import { AssetTotalDistributionsByTypeTotals } from "@/modules/assets/typings/properties";
import {
  totalDistributionsByTypeSorter,
  totalDistributionsByTypeTableColumns,
  totalDistributionsByTypeTotalsTableColumns,
} from "@/modules/assets/utils/properties";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { flexRender, Table as TTable } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, Fragment, useMemo, useState } from "react";
import {
  useAssetTotalDistributionsByTypeTable,
  useAssetTotalDistributionsByTypeTotalsTable,
} from "./hooks/useAssetTotalDistributionsByTypeTable";
import { sortItems } from "@/commons/model-in/formatters/sorters";

export interface TotalDistributionsByTypeProps
  extends Omit<CardWithHeaderProps, "children" | "icon" | "title"> {
  filters: GetAssetTotalDistributionsByTypeFilters;
}
export const TotalDistributionsByType: FC<TotalDistributionsByTypeProps> = ({
  filters,
  ...props
}) => {
  const [ordering, setOrdering] = useState(null);

  const {
    data: assets = [],
    isLoading: isLoadingAssets,
    isRefetching: isRefetchingAssets,
  } = useGetTotalDistributionByType({
    filters: {
      ...filters,
    },
  });

  const sortedAssets = useMemo(() => {
    return sortItems({
      items: assets,
      sortBy: ordering || "property",
      sorter: totalDistributionsByTypeSorter,
    });
  }, [assets, ordering]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({ items: sortedAssets });

  const {
    data: totals,
    isLoading: isLoadingTotals,
    isRefetching: isRefetchingTotals,
  } = useGetTotalDistributionByTypeTotals({
    filters,
  });

  const isLoading = isLoadingAssets || isLoadingTotals;
  const isRefetching = isRefetchingAssets || isRefetchingTotals;
  const assetsTable = useAssetTotalDistributionsByTypeTable({
    data: paginatedItems,
    columns: totalDistributionsByTypeTableColumns,
  });

  const totalData = useMemo(() => {
    return totals ? [totals] : [];
  }, [totals]);

  const totalsTable = useAssetTotalDistributionsByTypeTotalsTable({
    data: totalData,
    columns: totalDistributionsByTypeTotalsTableColumns,
  });

  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      title="Total Distributions by Type"
      isLoading={isLoading}
      isRefetching={isRefetching}
      hasDataToShow={!!assets?.length}
      bodyPadding={false}
      loaderKind="chart"
      disableOverflow
      {...props}
    >
      <TableCard.Body>
        <Table spreadsheet stickyData>
          <GenericTableHeader
            table={assetsTable}
            ordering={ordering}
            // onChangeOrdering={setOrdering}
          />
          <GenericTableBody
            preChildren={<TotalsRow table={totalsTable} />}
            table={assetsTable}
            hasData={!isLoading && assets?.length > 0}
          />
        </Table>
      </TableCard.Body>
      {count || assets?.length ? (
        <Table.Pagination
          total={totalPages}
          current={currentPage}
          onChangePage={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      ) : null}
    </CardWithHeader>
  );
};

interface TotalsRowProps {
  table: TTable<AssetTotalDistributionsByTypeTotals>;
}
const TotalsRow: FC<TotalsRowProps> = ({ table }) => {
  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <Table.Row key={row.id}>
          <Table.Data>
            <p className="font-bold">TOTALS</p>
          </Table.Data>
          {row.getVisibleCells().map((cell) => (
            <Fragment key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Fragment>
          ))}
        </Table.Row>
      ))}
    </>
  );
};
