import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { PropertyGeneralLedger } from "@/modules/tools/typings/property-level-validations";
import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC } from "react";
import { usePropertyGeneralLedgerTable } from "../hooks/usePropertyGeneralLedgerTable";

interface PropertyGeneralLedgerTableProps extends IsLoadingProp {
  data: PropertyGeneralLedger[];
}
export const PropertyGeneralLedgerTable: FC<
  PropertyGeneralLedgerTableProps
> = ({ data, isLoading }) => {
  const tableColumnsMonospacedKeys: Array<keyof PropertyGeneralLedger> = [
    "account_code",
    "month_to_date_balance_activity",
    "month_start_balance",
    "month_end_balance",
  ];

  const table = usePropertyGeneralLedgerTable({ data });
  return (
    <>
      <Table spreadsheet>
        <Table.Head className="sticky top-0 z-control">
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
              {row.getVisibleCells().map((cell) => {
                const getClasses = () => {
                  const classes = [];
                  cell.id.includes("code") && classes.push("w-28");
                  cell.id.includes("balance") && classes.push("w-36");
                  return classes.join(" ").trim();
                };

                const isColumnToAlignRight =
                  tableColumnsMonospacedKeys.includes(
                    cell.column.id as keyof PropertyGeneralLedger
                  );

                return (
                  <Table.Data
                    key={cell.id}
                    size="small"
                    spreadsheetLineColor="classic"
                    className={getClasses()}
                    monospaceFont={isColumnToAlignRight}
                    textAlignment={
                      isColumnToAlignRight && cell.column.id !== "account_code"
                        ? "right"
                        : "left"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                );
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <TableLoaderAndNoData isLoading={isLoading} data={data || []} />
    </>
  );
};
