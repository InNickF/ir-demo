import { GenericTableCellWithFormatter } from "@/commons/components/data-display/GenericTableCellWithFormatter";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { AssetRentRollSchema } from "@/modules/assets/schemas/properties";
import { AssetRentRoll } from "@/modules/assets/typings/properties";
import {
  assetRentRollFormatter,
  assetRentRollHeadersTableFormatter,
} from "@/modules/assets/utils/formatters/properties";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, Fragment } from "react";

const columnHelper = createColumnHelper<AssetRentRoll>();

export const allRentRollTableKeys = Object.keys(
  AssetRentRollSchema.shape
) as Array<keyof AssetRentRoll>;

const columns = allRentRollTableKeys.map((key) => {
  return columnHelper.accessor(key, {
    header: assetRentRollHeadersTableFormatter({ key }),
    cell: (info) => (
      <GenericTableCellWithFormatter<AssetRentRoll>
        formatter={assetRentRollFormatter}
        identifier={key}
        info={info}
        cellProps={{ className: "py-2" }}
      />
    ),
  });
});

const useAssetRentRollTable = (data?: AssetRentRoll[]) => {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface TenantTableProps extends IsLoadingProp {
  data: AssetRentRoll[];
  page: number;
  totalPages: number;
  count: number;
  setPage: (page: number) => void;
  ordering: string;
  setOrdering: (orderingKey: string) => void;
}

export const TenantsTable: FC<TenantTableProps> = ({
  data,
  page,
  setPage,
  isLoading,
  totalPages,
  count,
  ordering,
  setOrdering,
}) => {
  const table = useAssetRentRollTable(data);
  return (
    <>
      <TableCard.Body>
        <Table spreadsheet>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Header
                    key={header.id}
                    ordering={ordering}
                    orderingKey={header.id}
                    onOrdering={(orderingKey) => null}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Header>
                ))}
              </Table.Row>
            ))}
          </Table.Head>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Fragment>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TableCard.Body>
      <TableLoaderAndNoData isLoading={isLoading} data={data} />
      {count ? (
        <Table.Pagination
          total={totalPages}
          current={page}
          onChangePage={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      ) : null}
    </>
  );
};
