import {
  LeaseComp,
  LeaseCompTotals,
} from "@/acquisitions/typings/market-analytics";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { amountConversions } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, Tooltip } from "in-ui-react";
import { FC, useMemo } from "react";
import { TotalsLoader } from "../../TotalsLoader";
import { CompTableProps } from "../../types";

const { numberToDollar } = amountConversions;

const NotesText: FC<{ text: string }> = ({ text }) => {
  const textSliceLength = 80;
  const textLength = text?.length;
  const isLongText = textLength > textSliceLength;
  const slicedText = (text: string): string => {
    return text.slice(0, textSliceLength)?.concat("...");
  };
  const TextWithTooltip = () => (
    <Tooltip content={text}>
      <p>{slicedText(text)}</p>
    </Tooltip>
  );

  return isLongText ? <TextWithTooltip /> : <p>{genericGetValue(text)}</p>;
};

const columnHelper = createColumnHelper<LeaseComp>();

const useLeaseCompTable = (
  data: LeaseComp[],
  columns: ColumnDef<LeaseComp>[]
) => {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

export const LeaseCompTable: FC<CompTableProps<LeaseComp, LeaseCompTotals>> = ({
  data,
  totals,
  page,
  setPage,
  isLoading,
  isLoadingTotals,
  totalPages,
  count,
  ordering,
  setOrdering,
  tableActions,
}) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => genericGetValue(info.getValue()),
      }),
      columnHelper.accessor("address", {
        header: "Address",
        cell: (info) => genericGetValue(info.getValue()),
      }),
      columnHelper.accessor("submarket", {
        header: "Sub-Market",
        cell: (info) => genericGetValue(info.getValue()),
      }),
      columnHelper.accessor("tenant", {
        header: "Tenant",
        cell: (info) => genericGetValue(info.getValue()),
      }),
      columnHelper.accessor("sf", {
        header: "SF",
        cell: (info) => numberToDollar({ value: info.getValue() }),
      }),
      columnHelper.accessor("rent_sf_month", {
        header: "Rent/SF/Month",
        cell: (info) => numberToDollar({ value: info.getValue() }),
      }),
      columnHelper.accessor("recoveries", {
        header: "Recoveries",
        cell: (info) => genericGetValue(info.getValue()),
      }),
      columnHelper.accessor("notes", {
        header: "Notes",
        cell: (info) => <NotesText text={info.getValue()} />,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (props) => tableActions({ ...props.row.original }),
      }),
    ],
    [tableActions]
  );
  const table = useLeaseCompTable(data, columns);
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
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Data
                    key={cell.id}
                    className={`h-12 ${
                      cell.id.includes("notes") && "max-w-[300px]"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                ))}
              </Table.Row>
            ))}
            {data.length ? (
              <Table.Row>
                <Table.Data colSpan={5}>
                  <strong>Average</strong>
                </Table.Data>
                <Table.Data>
                  {isLoadingTotals ? (
                    <TotalsLoader />
                  ) : (
                    numberToDollar({ value: totals?.rent_sf_month__wavg })
                  )}
                </Table.Data>
                <Table.Data></Table.Data>
                <Table.Data></Table.Data>
                <Table.Data></Table.Data>
              </Table.Row>
            ) : null}
          </Table.Body>
        </Table>
      </TableCard.Body>
      <TableLoaderAndNoData isLoading={isLoading} data={data} />
      {count || data.length ? (
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
