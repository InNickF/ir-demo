import {
  getTextColorForOFPMetricComparison,
  OPERATIONAL_FINANCIAL_PERFORMANCE_HIGHLIGHTED_METRICS,
} from "@/assets/utils/operational-financial-performance";
import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { capitalize } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import {
  OperationalFinancialPerformanceComparison,
  OperationalFinancialPerformanceTableMetrics,
} from "@/modules/assets/typings/operational-financial-performance";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Radio, Table } from "in-ui-react";
import { FC } from "react";
import { OFPSelectedMetric } from "../../../types";
import "../styles.css";

interface IUsePropertyPerformanceTableOptions extends OFPSelectedMetric {
  data: OperationalFinancialPerformanceTableMetrics[];
  activeComparison: OperationalFinancialPerformanceComparison;
}

const usePropertyPerformanceTable = ({
  data,
  onSelectMetric,
  activeComparison,
  selectedMetric,
}: IUsePropertyPerformanceTableOptions) => {
  const columnHelper =
    createColumnHelper<OperationalFinancialPerformanceTableMetrics>();

  const columns = [
    columnHelper.accessor("metric", {
      header: "Metric",
      cell: (info) => {
        const metric = info.getValue();
        const metricIsSelected = selectedMetric === metric;

        return (
          <div className="flex items-center gap-1">
            <Radio
              key={metric}
              label=""
              checked={metricIsSelected}
              onChange={(e) => {
                e.stopPropagation();
                onSelectMetric(metric);
              }}
            />
            <span
              className={
                OPERATIONAL_FINANCIAL_PERFORMANCE_HIGHLIGHTED_METRICS.includes(
                  metric
                )
                  ? "font-bold"
                  : null
              }
            >
              {humanizeSnakeCase(metric)}
            </span>
          </div>
        );
      },
    }),

    columnHelper.accessor("ytd_actuals", {
      header: "Actuals",
      cell: (info) =>
        numberToDollar({
          value: info.getValue(),
          options: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        }),
    }),

    columnHelper.accessor("ytd_reference", {
      header: capitalize(activeComparison || ""),
      cell: (info) =>
        numberToDollar({
          value: info.getValue(),
          options: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        }),
    }),

    columnHelper.accessor("variance", {
      header: "Variance",
      cell: (info) => {
        const spanClasses = getTextColorForOFPMetricComparison({
          variance: info?.row?.original?.variance,
          type: info?.row?.original?.type,
        });

        return (
          <span className={spanClasses}>
            {numberToDollar({
              value: info.getValue(),
              options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              },
            })}
          </span>
        );
      },
    }),

    columnHelper.accessor("variance_percentage", {
      header: "Variance %",
      cell: (info) => {
        const metricValue = info.getValue();
        const spanClasses = getTextColorForOFPMetricComparison({
          variance: info?.row?.original?.variance,
          type: info?.row?.original?.type,
        });

        return (
          <span className={spanClasses}>{numberToPercent(metricValue)}</span>
        );
      },
    }),
  ];

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface PropertyPerformanceMetricsTableProps
  extends IsLoadingProp,
    OFPSelectedMetric {
  data: OperationalFinancialPerformanceTableMetrics[];
  activeComparison: OperationalFinancialPerformanceComparison;
}

export const PropertyPerformanceMetricsTable: FC<
  PropertyPerformanceMetricsTableProps
> = ({
  data = [],
  isLoading,
  onSelectMetric,
  activeComparison,
  selectedMetric,
}) => {
  const prefix = "assets-property-performance-table";
  const table = usePropertyPerformanceTable({
    data,
    onSelectMetric,
    activeComparison,
    selectedMetric,
  });

  return (
    <>
      <TableCard.Body>
        <Table className={prefix}>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Header
                    key={header.id}
                    ordering={null}
                    orderingKey={null}
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
            {table.getRowModel().rows.map((row) => {
              const rowMetric = row?.original?.metric;
              const rowClasses = () => {
                const classes = [];
                rowMetric === selectedMetric &&
                  classes.push(`${prefix}--selected-row`);
                OPERATIONAL_FINANCIAL_PERFORMANCE_HIGHLIGHTED_METRICS.includes(
                  rowMetric
                ) && classes.push(`${prefix}--highlighted-row`);
                return classes.join(" ");
              };
              return (
                <Table.Row
                  key={row.id}
                  onClick={() => onSelectMetric(rowMetric)}
                  className={rowClasses()}
                >
                  {row.getVisibleCells().map((cell) => {
                    const colId = cell.column.id;

                    return (
                      <Table.Data
                        key={cell.id}
                        size="big"
                        textAlignment="right"
                        monospaceFont={!colId?.includes("metric")}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Data>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <TableLoaderAndNoData isLoading={isLoading} data={data} />
      </TableCard.Body>
    </>
  );
};
