import { FC } from "react";
import { CriticalDatesTableItem } from "@/acquisitions/typings/deals";
import { Link, Table } from "in-ui-react";
import { default as NextLink } from "next/link";
import { TableCard } from "@/commons/components/general/TableCard";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { amountConversions } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { IsLoadingProp } from "@/commons/typings";

const columnHelper = createColumnHelper<CriticalDatesTableItem>();
const columns = [
  columnHelper.accessor("deal_name", {
    header: "Deal Name",
    cell: (info) => (
      <>
        <NextLink
          href={`/acquisitions/deals/deal-summary/?dealId=${info.row.original.deal_id}`}
          passHref
        >
          <Link>{genericGetValue(info.getValue())}</Link>
        </NextLink>
      </>
    ),
  }),
  columnHelper.accessor("activity", {
    header: "Activity",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  columnHelper.accessor("critical_date", {
    header: "Critical Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  columnHelper.accessor("remaining_days", {
    header: "Remaining Days",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) =>
      info.getValue()
        ? amountConversions.numberToDollar({ value: info.getValue() })
        : genericNoDataText,
  }),
];

const useDealsTable = (data?: CriticalDatesTableItem[]) => {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface DealsTableProps extends IsLoadingProp {
  data: CriticalDatesTableItem[];
  page: number;
  totalPages: number;
  count: number;
  setPage: (page: number) => void;
  ordering: string;
  setOrdering: (orderingKey: string) => void;
}

export const CriticalDatesTable: FC<DealsTableProps> = ({
  data,
  page,
  setPage,
  isLoading,
  totalPages,
  count,
  ordering,
  setOrdering,
}) => {
  const table = useDealsTable(data);
  return (
    <>
      <TableCard.Body>
        <Table>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Header
                    key={header.id}
                    ordering={ordering}
                    orderingKey={header.id}
                    onOrdering={(orderingkey) => null}
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
                {row.getVisibleCells().map((cell) => (
                  <Table.Data key={cell.id} className="h-12">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </TableCard.Body>
      <TableLoaderAndNoData isLoading={isLoading} data={data} />
      {count ? (
        <Table.Pagination
          total={totalPages}
          current={page}
          onChangePage={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      ) : null}
    </>
  );
};
