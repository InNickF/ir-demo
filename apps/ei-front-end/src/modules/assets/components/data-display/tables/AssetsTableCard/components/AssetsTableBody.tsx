import { flexRender } from "@tanstack/react-table";
import { Empty, Table } from "in-ui-react";
import { FC, Fragment } from "react";
import { PropertiesTable } from "./types";

interface AssetsTableBodyProps {
  table: PropertiesTable;
  hasData?: boolean;
}
export const AssetsTableBody: FC<AssetsTableBodyProps> = ({
  table,
  hasData,
}) => {
  return (
    <Table.Body>
      {hasData ? (
        table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Fragment key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Fragment>
            ))}
          </Table.Row>
        ))
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
  );
};
