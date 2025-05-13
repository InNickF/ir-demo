import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { CompstackComp } from "@/modules/acquisitions/typings/market-analytics";
import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { GenericCompstackCompTableProps } from "../types";

export const GenericCompstackCompTable = <Comp extends CompstackComp>({
  table,
  page,
  setPage,
  isLoading,
  totalPages,
  ordering,
  setOrdering,
  totalRows,
}: GenericCompstackCompTableProps<Comp>) => {
  const dataLength = table.getRowModel().rows.length;
  const hasPagination = false;
  const noData = !dataLength && !isLoading;
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
                    orderingKey={
                      setOrdering && header.id !== "actions" ? header.id : null
                    }
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
                  <Table.Data
                    key={cell.id}
                    className={`h-12 ${
                      cell.id.includes("notes") && "max-w-[300px]"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                ))}
              </Table.Row>
            ))}
            {noData ? null : totalRows}
          </Table.Body>
        </Table>
      </TableCard.Body>
      <TableLoaderAndNoData
        isLoading={isLoading}
        data={table.getRowModel().rows}
      />
      {hasPagination ? (
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
