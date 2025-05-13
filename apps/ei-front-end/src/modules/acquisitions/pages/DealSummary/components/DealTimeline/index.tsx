import { FC } from "react";
import { CardProps, Table } from "in-ui-react";
import { TableCard } from "@/commons/components/general/TableCard";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { DealTimelineItemSummary } from "@/acquisitions/typings/deals";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

interface DealTimelineProps extends CardProps, IsLoadingProp {
  timeline: DealTimelineItemSummary[];
}

export const DealTimeline: FC<DealTimelineProps> = ({
  timeline = [],
  isLoading,
  className,
  ...props
}) => {
  const getClasses = () => {
    const classes = ["acq-deal-summary-grid--grid-cards"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      title="Deal Timeline"
      icon={<CalendarIcon />}
      className={getClasses()}
      bodyPadding={false}
      {...props}
    >
      <TableCard.Body>
        <DealTimelineTable timeline={timeline} isLoading={isLoading} />
      </TableCard.Body>
    </CardWithHeader>
  );
};

const columnHelper = createColumnHelper<DealTimelineItemSummary>();
const columns = [
  columnHelper.accessor("type.name" as "type", {
    header: "Name",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  columnHelper.accessor("critical_date", {
    header: "Critical Date",
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => numberToDollar({ value: info.getValue() }),
  }),
  columnHelper.accessor("remaining_days", {
    header: "Remaining Days",
    cell: (info) => info.getValue(),
  }),
];

const DealTimelineTable: FC<
  { timeline: DealTimelineProps["timeline"] } & IsLoadingProp
> = ({ timeline = [], isLoading }) => {
  const table = useReactTable({
    data: timeline,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Table>
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Header key={header.id}>
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
                <Table.Data key={cell.id} className="h-12">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Data>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <TableLoaderAndNoData isLoading={isLoading} data={timeline} />
    </>
  );
};
