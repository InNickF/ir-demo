import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, Tooltip } from "in-ui-react";
import { FC, useMemo } from "react";

const CommentText: FC<{ text: string }> = ({ text }) => {
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

interface IUseLoanTimelineOptions {
  tableActions?: (row: DebtLoanTimeline) => JSX.Element;
  data: DebtLoanTimeline[];
}

const useLoanTimelineTable = ({
  data,
  tableActions,
}: IUseLoanTimelineOptions) => {
  const columnHelper = createColumnHelper<DebtLoanTimeline>();

  const columns = [
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => genericGetValue(info.getValue()),
    }),
    columnHelper.accessor("notable_date", {
      header: "Notable Date",
      cell: (info) => genericGetValue(info.getValue()),
    }),
    columnHelper.accessor("comment", {
      header: "Comment",
      cell: (info) => <CommentText text={info.getValue()} />,
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => tableActions(props.row.original),
    }),
  ];

  const finalColumns = useMemo(() => {
    if (!tableActions) {
      return columns.filter((column) => column.id !== "actions");
    }
    return columns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableActions]);

  return useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface LoanTimelineTableProps extends IsLoadingProp {
  data: DebtLoanTimeline[];
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  tableActions?: (row: DebtLoanTimeline) => JSX.Element;
}

export const LoanTimelineTable: FC<LoanTimelineTableProps> = ({
  data,
  page = 1,
  setPage = null,
  isLoading = false,
  totalPages = 1,
  count = 0,
  ordering = null,
  setOrdering = null,
  tableActions,
}) => {
  const table = useLoanTimelineTable({ data, tableActions });
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
                      cell.id.includes("comments") && "max-w-[300px]"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <TableLoaderAndNoData isLoading={isLoading} data={data} />
      </TableCard.Body>
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
