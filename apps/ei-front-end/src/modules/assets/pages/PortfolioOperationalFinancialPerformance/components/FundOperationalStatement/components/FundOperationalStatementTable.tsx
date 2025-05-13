import { TableCard } from "@/commons/components/general/TableCard";
import { FundOperationalStatement } from "@/modules/assets/typings/operational-financial-performance";
import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, useMemo, useState } from "react";
import { useFundOperationalStatementTable } from "../hooks";
import "../styles.css";
import {
  FundOperationalStatementAllColumnId,
  sortFundOperationalStatementTableColumns,
} from "../utils";

interface FundOperationalStatementTableProps {
  data: FundOperationalStatement[];
  activeComparison: string;
}
export const FundOperationalStatementTable: FC<
  FundOperationalStatementTableProps
> = ({ data, activeComparison }) => {
  const prefix = "assets-fund-operational-property-comparison";

  const [sort, setSort] = useState<FundOperationalStatementAllColumnId>("name");

  const sortedData = useMemo(() => {
    return sortFundOperationalStatementTableColumns({
      data,
      sortBy: sort,
    });
  }, [data, sort]);

  const table = useFundOperationalStatementTable({
    data: sortedData,
    activeComparison,
  });
  return (
    <TableCard.Body>
      <Table spreadsheet stickyData className={prefix}>
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Header
                  key={header.id}
                  colSpan={header.colSpan}
                  ordering={sort}
                  onOrdering={(columnId) => null}
                  orderingKey={header.column.columnDef.id}
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
              {row.getVisibleCells().map((cell) => {
                const monoFormat = !cell?.column?.id.includes("name");
                return (
                  <Table.Data
                    key={cell.id}
                    monospaceFont={monoFormat}
                    textAlignment={monoFormat ? "right" : "left"}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                );
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </TableCard.Body>
  );
};
