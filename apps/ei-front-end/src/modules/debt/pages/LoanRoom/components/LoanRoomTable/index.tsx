import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { DebtLoanRoomItem } from "@/modules/debt/typings/loans";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Table, Tooltip } from "in-ui-react";
import { FC, useMemo } from "react";

interface IUseLoanRoomOptions {
  tableActions?: (row: DebtLoanRoomItem) => JSX.Element;
  data: DebtLoanRoomItem[];
}

const DownloadAction: FC<Pick<DebtLoanRoomItem, "file">> = ({ file }) => {
  return (
    <Tooltip content="Download">
      <Button
        className="p-3"
        as="a"
        href={file}
        target="_blank"
        size="big"
        onlyIcon
        icon={<ArrowDownTrayIcon />}
        kind="ghost"
      />
    </Tooltip>
  );
};

const useLoanRoomTable = ({ data, tableActions }: IUseLoanRoomOptions) => {
  const columnHelper = createColumnHelper<DebtLoanRoomItem>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => genericGetValue(info.getValue()),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => genericGetValue(info.getValue().label),
    }),
    columnHelper.accessor("uploaded_at", {
      header: "Upload At",
      cell: (info) => genericGetValue(info.getValue()),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (props) => {
        return (
          <div className="flex">
            <DownloadAction file={props.row.original.file} />
            {tableActions(props.row.original)}
          </div>
        );
      },
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

interface LoanRoomTableProps extends IsLoadingProp {
  data: DebtLoanRoomItem[];
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  tableActions?: (row: DebtLoanRoomItem) => JSX.Element;
}

export const LoanRoomTable: FC<LoanRoomTableProps> = ({
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
  const table = useLoanRoomTable({ data, tableActions });
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
