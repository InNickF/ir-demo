import { flexRender, Table as TTable } from "@tanstack/react-table";
import { Empty, Table } from "in-ui-react";
import { FC, Fragment, ReactNode } from "react";

interface GenericTableBodyProps {
  table: TTable<unknown>;
  hasData?: boolean;
  preChildren?: ReactNode;
  postChildren?: ReactNode;
}
export const GenericTableBody: FC<GenericTableBodyProps> = ({
  table,
  hasData,
  preChildren,
  postChildren,
}) => {
  return (
    <Table.Body>
      {preChildren}
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
      {postChildren}
    </Table.Body>
  );
};
