import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import { timelineFormatter } from "@/modules/debt/utils/formatters/overview-formatters";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, Table, Tooltip } from "in-ui-react";
import { default as NextLink } from "next/link";
import { FC } from "react";

const CommentText: FC<{ text: string }> = ({ text }) => {
  const textSliceLength = 20;
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

  return isLongText ? (
    <TextWithTooltip />
  ) : (
    <p>{timelineFormatter.comment(text)}</p>
  );
};

const useDebtLoanTimelineTable = ({ data }: { data: DebtLoanTimeline[] }) => {
  const columnHelper = createColumnHelper<DebtLoanTimeline>();

  const columns = [
    columnHelper.accessor("loan_name", {
      header: "Loan Name",
      cell: (info) => (
        <>
          <NextLink
            href={`/debt/loans/loan-summary/?loanId=${info.row.original.loan_abstract_id}`}
            passHref
          >
            <Link>{genericGetValue(info.getValue())}</Link>
          </NextLink>
        </>
      ),
    }),

    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => timelineFormatter.type(info.getValue()),
    }),

    columnHelper.accessor("notable_date", {
      header: "Notable Date",
      cell: (info) => timelineFormatter.notable_date(info.getValue()),
    }),

    columnHelper.accessor("comment", {
      header: "Comment",
      cell: (info) => <CommentText text={info.getValue()} />,
    }),
  ];

  return useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface DebtLoanTimelinesTableProps extends IsLoadingProp {
  data: DebtLoanTimeline[];
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  page: number;
  totalPages: number;
  count: number;
  setPage: (page: number) => void;
}

export const DebtLoanTimelinesTable: FC<DebtLoanTimelinesTableProps> = ({
  data,
  isLoading = false,
  ordering = null,
  setOrdering = null,
  page,
  totalPages,
  count,
  setPage,
}) => {
  const table = useDebtLoanTimelineTable({ data });
  return (
    <div className="flex flex-col justify-between h-full">
      <TableCard.Body>
        <Table spreadsheet>
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
                  <Table.Data key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Data>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <TableLoaderAndNoData isLoading={isLoading} data={data} />
      </TableCard.Body>
      {count || data.length ? (
        <Table.Pagination
          total={totalPages}
          current={page}
          onChangePage={setPage}
        />
      ) : null}
    </div>
  );
};
