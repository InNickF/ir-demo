import { IsLoadingProp } from "@/commons/typings";
import { PropertyJournalEntry } from "@/modules/tools/typings/property-level-validations";
import { flexRender } from "@tanstack/react-table";
import { Empty, Table } from "in-ui-react";
import { FC, Fragment } from "react";
import { usePropertyJournalEntriesTable } from "../hooks/usePropertyJournalEntriesTable";

interface PropertyJournalEntriesTableProps extends IsLoadingProp {
  data: PropertyJournalEntry[];
  ordering?: string;
  onChangeOrdering?: (ordering: keyof PropertyJournalEntry) => void;
}
export const PropertyJournalEntriesTable: FC<
  PropertyJournalEntriesTableProps
> = ({ data, isLoading, ordering, onChangeOrdering }) => {
  const table = usePropertyJournalEntriesTable({ data });

  const tableColumnsMonospacedKeys = [
    "transaction_control_code",
    "account_code",
    "amount",
  ];

  const monospacedKeyWithoutAlign = [
    "transaction_date",
    "account_code",
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
