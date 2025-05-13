import { DealTenantInformation } from "@/acquisitions/typings/deals";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import { humanizeHTMLString } from "@/commons/model-in/formatters/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, useMemo } from "react";

const ShortText: FC<{ text: string; maxLength: number }> = ({
  text,
  maxLength,
}) => {
  const htmlText = humanizeHTMLString(text);
  const slicedText = slicedTextWithEllipsis({ text: htmlText, maxLength });
  return <p>{genericGetValue(slicedText)}</p>;
};

interface IUseDealTenantInformationOptions {
  tableActions?: (row: DealTenantInformation) => JSX.Element;
  data: DealTenantInformation[];
}

const useDealTenantInformationTable = ({
  data,
  tableActions,
}: IUseDealTenantInformationOptions) => {
  const columnHelper = createColumnHelper<DealTenantInformation>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <ShortText text={info.getValue()} maxLength={60} />,
    }),

    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => <ShortText text={info.getValue()} maxLength={80} />,
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => tableActions(info.row.original),
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

interface DealTenantInformationTableProps extends IsLoadingProp {
  data: DealTenantInformation[];
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  tableActions?: (row: DealTenantInformation) => JSX.Element;
  readOnly?: boolean;
}

export const DealTenantInformationTable: FC<
  DealTenantInformationTableProps
> = ({
  data,
  page = 1,
  setPage = null,
  isLoading = false,
  totalPages = 1,
  count = 0,
  tableActions,
  ordering,
  setOrdering,
  readOnly,
}) => {
  const table = useDealTenantInformationTable({ data, tableActions });

  const tdClassNames = (id: string): string => {
    const classNames = ["h-12"];
    id.includes("actions") &&
      classNames.push(readOnly ? "w-[70px]" : "w-[155px]");
    return classNames.join(" ");
  };
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
                    onOrdering={() => null}
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
                    className={tdClassNames(cell.id)}
                    wrapText
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
