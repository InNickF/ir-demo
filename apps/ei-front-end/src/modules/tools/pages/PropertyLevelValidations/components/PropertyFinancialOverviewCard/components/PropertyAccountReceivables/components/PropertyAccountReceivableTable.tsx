import { IsLoadingProp } from "@/commons/typings";
import {
  PropertyAccountReceivable,
  PropertyJournalEntry,
} from "@/modules/tools/typings/property-level-validations";
import { flexRender } from "@tanstack/react-table";
import { Empty, Table } from "in-ui-react";
import { FC, Fragment } from "react";
import { usePropertyAccountReceivableTable } from "../hooks/usePropertyAccountReceivableTable";

interface PropertyAccountReceivableTableProps extends IsLoadingProp {
  data: PropertyAccountReceivable[];
  ordering?: string;
  onChangeOrdering?: (ordering: keyof PropertyAccountReceivable) => void;
}
export const PropertyAccountReceivableTable: FC<
  PropertyAccountReceivableTableProps
> = ({ data, isLoading, ordering, onChangeOrdering }) => {
  const table = usePropertyAccountReceivableTable({ data });

  const tableColumnsMonospacedKeys = [
    "transaction_control_code",
    "yardi_person_code",
    "amount",
  ];

  const monospacedKeyWithoutAlign = [
    "yardi_person_code",
    "transaction_control_code",
  ];

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
                      cell.id.includes("date") && classes.push("w-36");
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
                          !monospacedKeyWithoutAlign.includes(
                            cell.column.id as keyof PropertyJournalEntry
                          )
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
