import { CompstackSalesComp } from "@/acquisitions/typings/market-analytics";
import { SlicedText } from "@/commons/components/data-display/SlicedText";
import { compstackSalesCompValueFormatters } from "@/modules/acquisitions/utils/formatters/comps-value-formatters";
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

const columnHelper = createColumnHelper<CompstackSalesComp>();

export const useSaleCompsTable = ({
  data,
  tableActions = null,
}: UseCompstackCompsTableKookParams<CompstackSalesComp>) => {
  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("sales_date", {
        header: "Sales Date",
        cell: (info) =>
          compstackSalesCompValueFormatters.sales_date(info.getValue()),
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
      columnHelper.accessor("in_place_cap_rate", {
        header: "In Place Cap Rate",
        cell: (info) =>
          compstackSalesCompValueFormatters.in_place_cap_rate(info.getValue()),
      }),
      columnHelper.accessor("price_per_sf", {
        header: "Price Per SF",
        cell: (info) =>
          compstackSalesCompValueFormatters.price_per_sf(info.getValue()),
      }),
      columnHelper.accessor("sale_price", {
        header: "Sale Price",
        cell: (info) =>
          compstackSalesCompValueFormatters.sale_price(info.getValue()),
      }),
      columnHelper.accessor("building_condition", {
        header: "Building Condition",
        cell: (info) =>
          compstackSalesCompValueFormatters.building_condition(info.getValue()),
      }),
      columnHelper.accessor("size", {
        header: "Size",
        cell: (info) => compstackSalesCompValueFormatters.size(info.getValue()),
      }),
      columnHelper.accessor("hold_period_years", {
        header: "Hold Period Years",
        cell: (info) =>
          compstackSalesCompValueFormatters.hold_period_years(info.getValue()),
      }),
      columnHelper.accessor("hold_period_months", {
        header: "Hold Period Months",
        cell: (info) =>
          compstackSalesCompValueFormatters.hold_period_months(info.getValue()),
      }),
      columnHelper.accessor("amenities", {
        header: "Amenities",
        cell: (info) =>
          compstackSalesCompValueFormatters.amenities(info.getValue()),
      }),
      columnHelper.accessor("transaction_notes", {
        header: "Transaction Notes",
        cell: (info) => <SlicedText text={info.getValue()} />,
      }),
    ];

    if (tableActions) {
      cols.push(
        columnHelper.display({
          id: "actions",
          header: "Actions",
          cell: (info) => tableActions(info.row.original),
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

export const CompstackSaleCompsTable: FC<
  CompstackCompTableProps<CompstackSalesComp>
> = ({ data, tableActions, ...props }) => {
  const table = useSaleCompsTable({ data, tableActions });
  return <GenericCompstackCompTable {...props} table={table} />;
};
