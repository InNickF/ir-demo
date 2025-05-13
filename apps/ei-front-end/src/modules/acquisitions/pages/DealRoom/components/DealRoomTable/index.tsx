import { DealRoomItem } from "@/acquisitions/typings/deals";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Table, Tag, Tooltip } from "in-ui-react";
import { FC, useMemo } from "react";

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

interface IUseDealRoomOptions {
  tableActions?: (row: DealRoomItem) => JSX.Element;
  data: DealRoomItem[];
}

const DownloadAction: FC<Pick<DealRoomItem, "file">> = ({ file }) => {
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

const useDealRoomTable = ({ data, tableActions }: IUseDealRoomOptions) => {
  const columnHelper = createColumnHelper<DealRoomItem>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => genericGetValue(info.getValue()),
    }),
    columnHelper.accessor("labels", {
      header: "Labels",
      cell: (info) => (
        <div className="flex gap-1">
          {info.getValue()?.map(({ label, value }) => {
            return <Tag key={value} text={label.toString()} size="small" />;
          })}
        </div>
      ),
    }),
    columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => <NotesText text={info.getValue()} />,
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

interface DealRoomTableProps extends IsLoadingProp {
  data: DealRoomItem[];
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  tableActions?: (row: DealRoomItem) => JSX.Element;
}

export const DealRoomTable: FC<DealRoomTableProps> = ({
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
  const table = useDealRoomTable({ data, tableActions });
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
