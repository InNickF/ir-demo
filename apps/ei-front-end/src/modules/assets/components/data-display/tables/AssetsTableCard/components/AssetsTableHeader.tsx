import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC } from "react";
import { PropertiesTable } from "./types";

interface AssetsTableHeaderProps {
  table: PropertiesTable;
  ordering?: string;
  onChangeOrdering?: (ordering: string) => void;
}
export const AssetsTableHeader: FC<AssetsTableHeaderProps> = ({
  table,
  ordering,
  onChangeOrdering,
}) => {
  return (
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
  );
};
