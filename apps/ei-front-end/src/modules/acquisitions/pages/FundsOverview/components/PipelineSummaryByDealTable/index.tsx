import { usePagination } from "@/commons/hooks/usePagination";
import {
  usePipelineSummaryByDealPhase,
  usePipelineSummaryByDealPhaseTotals,
} from "@/acquisitions/services/queries/deals";
import {
  PipelineSummaryTableDeal,
  PipelineSummaryDealTotal,
} from "@/acquisitions/typings/deals";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { GenericFilterPayload } from "@/commons/typings";
import { amountConversions, defaultPaginatedData } from "@/commons/utils";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { QueueListIcon } from "@heroicons/react/24/outline";
import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CardProps, Link, LoadingLine, Table } from "in-ui-react";
import { default as NextLink } from "next/link";
import { FC, useState } from "react";
import { dealPhaseNameFormatter } from "@/modules/acquisitions/utils/formatters/phases-formatters";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

const totalColumnHelper = createColumnHelper<PipelineSummaryDealTotal>();
const dealsColumnHelper = createColumnHelper<PipelineSummaryTableDeal>();
const { numberToDollar, readableNumber } = amountConversions;

const totalColumns = [
  totalColumnHelper.accessor("phase", {
    header: "Phase",
    cell: (info) => {
      const phase = info.getValue()?.value;
      const formatter = dealPhaseNameFormatter[phase];
      return genericGetValue(formatter ? formatter(phase) : phase);
    },
  }),
  totalColumnHelper.display({
    id: "name",
    header: "Deal Name",
    cell: () => "Total",
  }),
  totalColumnHelper.accessor("equity", {
    header: "Total Equity",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  totalColumnHelper.accessor("total_cost", {
    header: "Total Cost",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  totalColumnHelper.accessor("sf", {
    header: "SF",
    cell: (info) => readableNumber(info.getValue()),
  }),
  totalColumnHelper.accessor("psa_execution_date", {
    header: "PSA Execution Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  totalColumnHelper.accessor("go_hard_date", {
    header: "Go Hard Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  totalColumnHelper.accessor("closing_date", {
    header: "Closing Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
];
const dealsColumns = [
  dealsColumnHelper.accessor("phase", {
    header: "Phase",
    cell: (info) => genericGetValue(info.getValue()?.value),
  }),
  dealsColumnHelper.accessor("name", {
    header: "Deal Name",
    cell: (info) => (
      <>
        <NextLink
          href={`/acquisitions/deals/deal-summary/?dealId=${info.row.original.id}`}
          passHref
        >
          <Link className="whitespace-nowrap">
            {genericGetValue(info.getValue())}
          </Link>
        </NextLink>
      </>
    ),
  }),
  dealsColumnHelper.accessor("equity", {
    header: "Total Equity",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  dealsColumnHelper.accessor("total_cost", {
    header: "Total Cost",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  dealsColumnHelper.accessor("sf", {
    header: "SF",
    cell: (info) => readableNumber(info.getValue()),
  }),
  dealsColumnHelper.accessor("psa_execution_date", {
    header: "PSA Execution Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  dealsColumnHelper.accessor("go_hard_date", {
    header: "Go Hard Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  dealsColumnHelper.accessor("closing_date", {
    header: "Closing Date",
    cell: (info) => genericGetValue(info.getValue()),
  }),
];

const GenericRowsPhase: FC<{
  row: Row<PipelineSummaryDealTotal>;
  filters: GenericFilterPayload;
}> = ({ row, filters }) => {
  const { page, setPage } = usePagination();
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = usePipelineSummaryByDealPhase({
    ...filters,
    phase: row.original.phase?.value,
    page: page.toString(),
  });

  const phaseTable = useReactTable({
    data: data.results,
    columns: dealsColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <>
      <Table.Row
        className="h-12 cursor-pointer bg-ghost-2"
        onClick={() => setIsCollapse((pre) => !pre)}
      >
        {row.getVisibleCells().map((cell) => (
          <Table.Data key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Data>
        ))}
      </Table.Row>

      {!isCollapse ? (
        <>
          {isRefetching ? (
            <>
              <Table.Row>
                <Table.Data
                  colSpan={dealsColumns.length}
                  className="h-[1px] p-0"
                >
                  <LoadingLine />
                </Table.Data>
              </Table.Row>
            </>
          ) : null}

          {phaseTable.getRowModel().rows.map((phaseRow) => (
            <Table.Row key={phaseRow.id}>
              {phaseRow.getVisibleCells().map((cell) => (
                <Table.Data key={cell.id}>
                  {cell.id.includes("_phase") // Hiding the phase column of deals
                    ? ""
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Data>
              ))}
            </Table.Row>
          ))}

          {!data.results.length || isLoading ? (
            <Table.Row>
              <Table.Data colSpan={8}>
                <TableLoaderAndNoData
                  isLoading={isLoading}
                  data={data.results}
                />
              </Table.Data>
            </Table.Row>
          ) : null}

          {data.count ? (
            <Table.Row>
              <Table.Data colSpan={dealsColumns.length}>
                <Table.Pagination
                  total={data.total_pages}
                  current={page}
                  onChangePage={(pageNumber) => setPage(pageNumber)}
                />
              </Table.Data>
            </Table.Row>
          ) : null}
        </>
      ) : null}
    </>
  );
};

interface PipelineSummaryProps extends CardProps {
  filters: GenericFilterPayload;
}
export const PipelineSummaryByDealTable: FC<PipelineSummaryProps> = ({
  filters,
  ...props
}) => {
  const [ordering, setOrdering] = useState("");
  const {
    data = [],
    isRefetching,
    isLoading,
  } = usePipelineSummaryByDealPhaseTotals({
    ...filters,
    phase: "",
    ordering: ordering,
  });

  const table = useReactTable({
    data: data,
    columns: totalColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <CardWithHeader
      title="Pipeline Summary by Deals"
      icon={<QueueListIcon />}
      isRefetching={isRefetching}
      isLoading={isLoading}
      bodyPadding={false}
      loaderKind="chart"
      {...props}
    >
      <TableCard.Body>
        <Table>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Header
                    key={header.id}
                    ordering={ordering}
                    orderingKey={header.id === "phase" ? "" : header.id}
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
              <GenericRowsPhase
                key={row.id}
                row={row}
                filters={{ ordering, ...filters }}
              />
            ))}
          </Table.Body>
        </Table>
      </TableCard.Body>
      <TableLoaderAndNoData isLoading={isLoading} data={data} />
    </CardWithHeader>
  );
};
