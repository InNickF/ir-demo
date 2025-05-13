import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  readableNumberWithOptions,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { ARTenantRow } from "@/modules/assets/typings/portfolio";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const arPropertyTableColumnHelper = createColumnHelper<ARTenantRow>();

export const arPropertyTableColumns = [
  arPropertyTableColumnHelper.accessor("name", {
    header: "Name",
    cell: (info) => genericGetValue(info.getValue()),
  }),
  arPropertyTableColumnHelper.accessor("account_receivable", {
    header: "A/R",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  arPropertyTableColumnHelper.accessor("charges_this_month", {
    header: "Charge This Month",
    cell: (info) =>
      numberToDollar({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      }),
  }),
  arPropertyTableColumnHelper.accessor("months_outstanding", {
    header: "Months Outstanding",
    cell: (info) =>
      readableNumberWithOptions({
        value: info.getValue(),
        options: {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        },
      }),
  }),
];

interface UseARPropertyTableArgs {
  data: ARTenantRow[];
}
export const useARPropertyTable = ({ data }: UseARPropertyTableArgs) => {
  return useReactTable({
    data,
    columns: arPropertyTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
