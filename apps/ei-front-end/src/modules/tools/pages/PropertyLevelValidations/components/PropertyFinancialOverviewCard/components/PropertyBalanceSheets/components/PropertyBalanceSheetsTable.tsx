import { IsLoadingProp } from "@/commons/typings";
import {
  PropertyBalanceSheet,
  PropertyJournalEntry,
} from "@/modules/tools/typings/property-level-validations";
import { flexRender } from "@tanstack/react-table";
import { Empty, Table } from "in-ui-react";
import { FC, Fragment } from "react";
import { usePropertyBalanceSheetsTable } from "../hooks/usePropertyBalanceSheetsTable";

interface PropertyBalanceSheetsTableProps extends IsLoadingProp {
  data: PropertyBalanceSheet[];
  ordering?: string;
  onChangeOrdering?: (ordering: keyof PropertyBalanceSheet) => void;
}
export const PropertyBalanceSheetsTable: FC<
  PropertyBalanceSheetsTableProps
> = ({ data, isLoading, ordering, onChangeOrdering }) => {
  const table = usePropertyBalanceSheetsTable({ data });

  const tableColumnsMonospacedKeys = ["account_code", "month_end_balance"];

  const hasData = !isLoading && data?.length > 0;
  return (
    <>
      <Table spreadsheet>
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Header
                  key={header.id}
                  ordering={ordering}
                  orderingKey={header.id !== "actions" ? header.id : null}
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
          {hasData ? (
            <>
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
                        cell.column.id as keyof PropertyJournalEntry
                      );

                    return (
                      <Table.Data
                        key={cell.id}
                        size="small"
                        spreadsheetLineColor="classic"
                        className={getClasses()}
                        monospaceFont={isColumnToAlignRight}
                        textAlignment={
                          isColumnToAlignRight &&
                          cell.column.id !== "account_code"
                            ? "right"
                            : "left"
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Data>
                    );
                  })}
                </Table.Row>
              ))}
            </>
          ) : (
            <Table.Row>
              <Table.Data colSpan={table.getVisibleFlatColumns().length}>
                <div className="flex">
                  <Empty />
                </div>
              </Table.Data>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
};
