import {
  LandComp,
  LandCompTotals,
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
import { CompTableProps } from "../../types";
import { TotalsLoader } from "../../TotalsLoader";

const { numberToDollar, readableNumber } = amountConversions;

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

const columnHelper = createColumnHelper<LandComp>();

const useLandCompsTable = (
  data: LandComp[],
  columns: ColumnDef<LandComp>[]
) => {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

export const LandCompsTable: FC<CompTableProps<LandComp, LandCompTotals>> = ({
  data,
  page,
  setPage,
  totals,
  isLoadingTotals,
  isLoading,
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
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => numberToDollar({ value: info.getValue() }),
      }),
      columnHelper.accessor("acres", {
        header: "Acres",
        cell: (info) => readableNumber(info.getValue()),
      }),
      columnHelper.accessor("price_acre", {
        header: "Price/Acre",
        cell: (info) => numberToDollar({ value: info.getValue() }),
      }),
      columnHelper.accessor("buildable_sf", {
        header: "Buildable SF",
        cell: (info) => readableNumber(info.getValue()),
      }),
      columnHelper.accessor("price_buildable_sf", {
        header: "Price/Buildable SF",
        cell: (info) => numberToDollar({ value: info.getValue() }),
      }),
      columnHelper.accessor("buyer", {
        header: "Buyer",
        cell: (info) => genericGetValue(info.getValue()),
      }),
      columnHelper.accessor("seller", {
        header: "Seller",
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

  const table = useLandCompsTable(data, columns);

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
                <Table.Data colSpan={3}>
                  <strong>Total / Average</strong>
                </Table.Data>
                <Table.Data>
                  {isLoadingTotals ? (
                    <TotalsLoader />
                  ) : (
                    numberToDollar({ value: totals?.price__sum })
                  )}
                </Table.Data>
                <Table.Data>
                  {isLoadingTotals ? (
                    <TotalsLoader />
                  ) : (
                    readableNumber(totals?.acres__sum)
                  )}
                </Table.Data>
                <Table.Data>
                  {isLoadingTotals ? (
                    <TotalsLoader />
                  ) : (
                    numberToDollar({ value: totals?.price_acre__wavg })
                  )}
                </Table.Data>
                <Table.Data>
                  {isLoadingTotals ? (
                    <TotalsLoader />
                  ) : (
                    readableNumber(totals?.buildable_sf__sum)
                  )}
                </Table.Data>
                <Table.Data>
                  {isLoadingTotals ? (
                    <TotalsLoader />
                  ) : (
                    numberToDollar({ value: totals?.price_buildable_sf__wavg })
                  )}
                </Table.Data>
                <Table.Data></Table.Data>
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
