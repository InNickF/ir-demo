import { flexRender, Table as TTable } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC } from "react";

interface GenericTableHeaderProps {
  table: TTable<unknown>;
  ordering?: string;
  onChangeOrdering?: (ordering: string) => void;
  disabledOrderKeys?: string[];
}
export const GenericTableHeader: FC<GenericTableHeaderProps> = ({
  table,
  ordering,
  onChangeOrdering,
  disabledOrderKeys = ["actions"],
}) => {
  return (
    <Table.Head>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Table.Header
              key={header.id}
              ordering={ordering}
              orderingKey={!disabledOrderKeys.includes(header.id) && header.id}
              onOrdering={(orderingKey) => {
                if (orderingKey !== undefined && orderingKey !== null) {
                  // onChangeOrdering && onChangeOrdering(orderingKey);
                }
              }}
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
  );
};
