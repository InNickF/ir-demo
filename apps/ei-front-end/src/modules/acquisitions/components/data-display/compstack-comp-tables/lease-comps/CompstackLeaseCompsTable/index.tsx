import { CompstackLeaseComp } from "@/acquisitions/typings/market-analytics";
import { SlicedText } from "@/commons/components/data-display/SlicedText";
import { compstackLeaseCompValueFormatters } from "@/modules/acquisitions/utils/formatters/comps-value-formatters";
import { getCompstackCompAddress } from "@/modules/acquisitions/utils/compstack-comps";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useMemo } from "react";
import { GenericCompstackCompTable } from "../../GenericCompstackCompTable";
import {
  CompstackCompTableProps,
  UseCompstackCompsTableKookParams,
} from "../../types";

const columnHelper = createColumnHelper<CompstackLeaseComp>();

export const useLandCompsTable = ({
  data,
  tableActions,
}: UseCompstackCompsTableKookParams<CompstackLeaseComp>) => {
  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("execution_date", {
        header: "Execution Date",
        cell: (info) =>
          compstackLeaseCompValueFormatters.execution_date(info.getValue()),
      }),
      columnHelper.display({
        id: "address",
        header: "Address",
        cell: (info) => (
          <SlicedText
            maxLength={35}
            text={getCompstackCompAddress(info.row.original)}
          />
        ),
      }),
      columnHelper.accessor("rent_escalation", {
        header: "Rent Escalation",
        cell: (info) =>
          compstackLeaseCompValueFormatters.rent_escalation(info.getValue()),
      }),
      columnHelper.accessor("year_built", {
        header: "Year Built",
        cell: (info) =>
          compstackLeaseCompValueFormatters.year_built(info.getValue()),
      }),
      columnHelper.accessor("annual_starting_rent", {
        header: "Annual Starting Rent",
        cell: (info) =>
          compstackLeaseCompValueFormatters.annual_starting_rent(
            info.getValue()
          ),
      }),
      columnHelper.accessor("monthly_rent", {
        header: "Monthly Rent",
        cell: (info) =>
          compstackLeaseCompValueFormatters.monthly_rent(info.getValue()),
      }),
      columnHelper.accessor("building_size", {
        header: "Building Size",
        cell: (info) =>
          compstackLeaseCompValueFormatters.building_size(info.getValue()),
      }),
      columnHelper.accessor("transaction_sqft", {
        header: "Transaction SQFT",
        cell: (info) =>
          compstackLeaseCompValueFormatters.transaction_sqft(info.getValue()),
      }),
      columnHelper.accessor("lease_term_months", {
        header: "Lease Term",
        cell: (info) =>
          compstackLeaseCompValueFormatters.lease_term_months(info.getValue()),
      }),
      columnHelper.accessor("lease_term_years", {
        header: "Lease Term",
        cell: (info) =>
          compstackLeaseCompValueFormatters.lease_term_years(info.getValue()),
      }),

      columnHelper.accessor("free_rent_months", {
        header: "Free Rent",
        cell: (info) =>
          compstackLeaseCompValueFormatters.free_rent_months(info.getValue()),
      }),

      columnHelper.accessor("free_rent_years", {
        header: "Free Rent",
        cell: (info) =>
          compstackLeaseCompValueFormatters.free_rent_years(info.getValue()),
      }),
      columnHelper.accessor("comments", {
        header: "Notes",
        cell: (info) => (
          <SlicedText
            text={compstackLeaseCompValueFormatters.comments(info.getValue())}
          />
        ),
      }),
    ];

    if (tableActions) {
      cols.push(
        columnHelper.display({
          id: "actions",
          header: "Actions",
          cell: (info) => tableActions({ ...info.row.original }),
        })
      );
    }

    return cols;
  }, [tableActions]);
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};

export const CompstackLeaseCompsTable: FC<
  CompstackCompTableProps<CompstackLeaseComp>
> = ({ data, tableActions, ...props }) => {
  const table = useLandCompsTable({ data, tableActions });
  return <GenericCompstackCompTable {...props} table={table} />;
};
