import { DebtLoan } from "@/modules/debt/typings/loans";
import { Table as RTable, flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, useMemo } from "react";

interface LoansTableHeadProps {
  table: RTable<DebtLoan>;
  extraKeysToIgnoreOrdering?: string[];
  ordering?: string;
  onChangeOrdering?: (ordering: string) => void;
}
export const LoansTableHead: FC<LoansTableHeadProps> = ({
  table,
  extraKeysToIgnoreOrdering = [],
  ordering,
  onChangeOrdering,
}) => {
  const keysToIgnore = useMemo(() => {
    return ["actions", ...extraKeysToIgnoreOrdering];
  }, [extraKeysToIgnoreOrdering]);

  const getOrderingKey = (orderingKey: string) => {
    if (ordering !== undefined && ordering !== null) {
      return !keysToIgnore.includes(orderingKey) ? orderingKey : null;
    }
    return null;
  };

  return (
    <Table.Head className="sticky top-0 bg-card z-over-all">
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Table.Header
              key={header.id}
              ordering={ordering}
              orderingKey={getOrderingKey(header.id)}
              onOrdering={(orderingKey) => {
                if (ordering !== undefined && ordering !== null) {
                  // onChangeOrdering && onChangeOrdering(orderingKey);
                }
              }}
              className={header.id.includes("sortable") ? "w-12" : undefined}
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
