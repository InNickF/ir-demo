import { SlicedText } from "@/commons/components/data-display/SlicedText";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { FundTimeline } from "@/modules/assets/typings/funds";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC } from "react";

const columnHelper = createColumnHelper<FundTimeline>();
const columns = [
  columnHelper.accessor("comment", {
    header: "Comment",
    cell: (info) => (
      <SlicedText text={genericGetValue(info.getValue())} maxLength={30} />
    ),
  }),
  columnHelper.accessor("notable_date", {
    header: "Notable Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
];

const useAssetPropertyTimelineTable = (data?: FundTimeline[]) => {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface FundCriticalDatesTableProps extends IsLoadingProp {
  data: FundTimeline[];
  page: number;
  totalPages: number;
  count: number;
  setPage: (page: number) => void;
  ordering: string;
  setOrdering: (orderingKey: string) => void;
}

export const FundCriticalDatesTable: FC<FundCriticalDatesTableProps> = ({
  data,
  page,
  setPage,
  isLoading,
  totalPages,
  count,
  ordering,
  setOrdering,
}) => {
  const table = useAssetPropertyTimelineTable(data);
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
