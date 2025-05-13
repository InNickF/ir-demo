import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { ARTenantDrillDownTable } from "@/modules/assets/typings/portfolio";
import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC } from "react";
import { useARTenantDrillDownTable } from "../hooks/useARTenantDrillDownTable";

interface ARTenantDrillDownTableDetailsProps extends IsLoadingProp {
  data: ARTenantDrillDownTable[];
  className?: string;
}
export const ARTenantDrillDownTableDetails: FC<
  ARTenantDrillDownTableDetailsProps
> = ({ data = [], isLoading }) => {
  const table = useARTenantDrillDownTable({ data });
  return (
    <>
      <Table>
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Header key={header.id}>
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
                <Table.Data key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Data>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <TableLoaderAndNoData isLoading={isLoading} data={data} />
    </>
  );
};
