import { DealRisksAndMitigants } from "@/acquisitions/typings/deals";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, useMemo } from "react";

const RiskAndMitigate: FC<{ original: DealRisksAndMitigants }> = ({
  original,
}) => {
  const { risk, mitigant } = original;
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex gap-2">
        <p className="min-w-[80px] w-[80px] font-bold">Risk:</p>
        <p>{slicedTextWithEllipsis({ text: risk, maxLength: 115 })}</p>
      </div>
      <div className="flex gap-2">
        <p className="min-w-[80px] w-[80px] font-bold">Mitigant:</p>
        <p>{slicedTextWithEllipsis({ text: mitigant, maxLength: 115 })}</p>
      </div>
    </div>
  );
};

interface IUseDealRisksAndMitigantsOptions {
  tableActions?: (row: DealRisksAndMitigants) => JSX.Element;
  data: DealRisksAndMitigants[];
}

const useDealRisksAndMitigantsTable = ({
  data,
  tableActions,
}: IUseDealRisksAndMitigantsOptions) => {
  const columnHelper = createColumnHelper<DealRisksAndMitigants>();

  const columns = [
    columnHelper.accessor("risk", {
      header: "Risk and Mitigants",
      cell: (info) => <RiskAndMitigate original={info.row.original} />,
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

interface DealRisksAndMitigantsTableProps extends IsLoadingProp {
  data: DealRisksAndMitigants[];
  page?: number;
  totalPages?: number;
  count?: number;
  setPage?: (page: number) => void;
  ordering?: string;
  setOrdering?: (orderingKey: string) => void;
  tableActions?: (row: DealRisksAndMitigants) => JSX.Element;
  readOnly?: boolean;
}

export const DealRisksAndMitigantsTable: FC<
  DealRisksAndMitigantsTableProps
> = ({
  data,
  page = 1,
  setPage = null,
  isLoading = false,
  totalPages = 1,
  count = 0,
  tableActions,
  readOnly,
}) => {
  const table = useDealRisksAndMitigantsTable({ data, tableActions });

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
                    ordering={null}
                    orderingKey={null}
                    onOrdering={null}
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
