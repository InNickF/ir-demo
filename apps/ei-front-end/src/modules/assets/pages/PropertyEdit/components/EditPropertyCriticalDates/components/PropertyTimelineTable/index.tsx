import { SlicedText } from "@/commons/components/data-display/SlicedText";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { PropertyTimeline } from "@/modules/assets/typings/property";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, useMemo } from "react";

interface IUsePropertyTimelineOptions {
  tableActions?: (row: PropertyTimeline) => JSX.Element;
  data: PropertyTimeline[];
}

const usePropertyTimelineTable = ({
  data,
  tableActions,
}: IUsePropertyTimelineOptions) => {
  const columnHelper = createColumnHelper<PropertyTimeline>();

  const columns = [
    columnHelper.accessor("comment", {
      header: "Comment",
      cell: (info) => (
        <SlicedText text={genericGetValue(info.getValue())} maxLength={60} />
      ),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => genericGetValue(info.getValue()),
    }),
    columnHelper.accessor("notable_date", {
      header: "Notable Date",
      cell: (info) => genericGetValue(info.getValue()),
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

interface PropertyTimelineTableProps extends IsLoadingProp {
  data: PropertyTimeline[];
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  tableActions?: (row: PropertyTimeline) => JSX.Element;
}

export const PropertyTimelineTable: FC<PropertyTimelineTableProps> = ({
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
  const table = usePropertyTimelineTable({ data, tableActions });
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
