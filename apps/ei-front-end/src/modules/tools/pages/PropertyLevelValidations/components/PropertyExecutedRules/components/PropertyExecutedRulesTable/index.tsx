import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { PropertyRule } from "@/modules/tools/typings/property-level-validations";
import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC } from "react";
import { usePropertyExecutedRulesTable } from "../../hooks/usePropertyExecutedRulesTable";
import "./styles.css";

const rowPrefix = "plv-property-executed-rule-row";
interface PropertyExecutedRulesTableProps extends IsLoadingProp {
  data: PropertyRule[];
}
export const PropertyExecutedRulesTable: FC<
  PropertyExecutedRulesTableProps
> = ({ data, isLoading }) => {
  const table = usePropertyExecutedRulesTable({ data });
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
          {table.getRowModel().rows.map((row) => {
            const isFailed = !row.original.check_pass;
            const getClasses = (cellId: string) => {
              const classes = [];
              isFailed &&
                cellId.includes("check_pass") &&
                classes.push(`${rowPrefix}__failed-cell`);
              cellId.includes("check_pass") && classes.push("w-28");
              cellId.includes("date") && classes.push("w-36");
              return classes.join(" ").trim();
            };

            return (
              <Table.Row
                key={row.id}
                className={isFailed ? `${rowPrefix}--failed` : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Data
                    key={cell.id}
                    size="small"
                    spreadsheetLineColor="classic"
                    className={getClasses(cell?.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <TableLoaderAndNoData isLoading={isLoading} data={data || []} />
    </>
  );
};
