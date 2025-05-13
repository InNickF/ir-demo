import { useDeals } from "@/acquisitions/services/queries/deals";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { usePagination } from "@/commons/hooks/usePagination";
import { GenericFilterPayload } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { flexRender } from "@tanstack/react-table";
import { LoadingLine, Table, Container } from "in-ui-react";
import { FC, useState } from "react";
import { useDealsTable } from "../../hooks/useDealsTable";
import { DealsTableHead } from "../DealsTableHead";

interface DealsTableProps {
  filters?: GenericFilterPayload;
  className?: string;
}

export const DealsTable: FC<DealsTableProps> = ({ filters, className }) => {
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useDeals({ page: page.toString(), ordering: ordering, ...filters });

  const table = useDealsTable({ data: data.results });

  return (
    <Container>
      <TableCard className={className}>
        {isRefetching ? <LoadingLine /> : null}
        <TableCard.Body>
          <Table>
            <DealsTableHead
              table={table}
              ordering={ordering}
              onChangeOrdering={(orderingKey) => {
                // setOrdering(orderingKey);
              }}
            />
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Data
                      key={cell.id}
                      className={`h-12 ${
                        cell.id.includes("comments") && "max-w-[300px]"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Data>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </TableCard.Body>
        <TableLoaderAndNoData isLoading={isLoading} data={data.results} />
        {data.count ? (
          <Table.Pagination
            total={data.total_pages}
            current={page}
            onChangePage={(pageNumber) => {
              setPage(pageNumber);
            }}
          />
        ) : null}
      </TableCard>
    </Container>
  );
};
