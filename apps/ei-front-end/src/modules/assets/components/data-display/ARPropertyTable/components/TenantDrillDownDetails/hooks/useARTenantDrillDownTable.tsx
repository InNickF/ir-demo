import { genericGetValueOrDash } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { ARTenantDrillDownTable } from "@/modules/assets/typings/portfolio";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const arTenantDrillDownTableColumnHelper =
  createColumnHelper<ARTenantDrillDownTable>();

const arTenantDrillDownTableColumns = [
  arTenantDrillDownTableColumnHelper.accessor("charge_type", {
    header: "Charge Type",
    cell: (info) => genericGetValueOrDash(info.getValue()),
  }),
  arTenantDrillDownTableColumnHelper.accessor("0_30", {
    header: "0 - 30",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      }),
  }),
  arTenantDrillDownTableColumnHelper.accessor("31_60", {
    header: "31 - 60",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      }),
  }),
  arTenantDrillDownTableColumnHelper.accessor("61_90", {
    header: "61 - 90",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      }),
  }),
  arTenantDrillDownTableColumnHelper.accessor("gt_90", {
    header: "+ 90",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      }),
  }),
  arTenantDrillDownTableColumnHelper.accessor("prepay", {
    header: "Prepay",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      }),
  }),
  arTenantDrillDownTableColumnHelper.accessor("charges", {
    header: "Charges",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      }),
  }),
];

interface UseARTenantDrillDownTableArgs {
  data: ARTenantDrillDownTable[];
}
export const useARTenantDrillDownTable = ({
  data,
}: UseARTenantDrillDownTableArgs) => {
  return useReactTable({
    data,
    columns: arTenantDrillDownTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
