import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { formatAccountCodeWithHyphens } from "@/modules/tools/utils";
import { PropertyBalanceSheet } from "@/tools/typings/property-level-validations";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, PropsWithChildren } from "react";

const propertyBalanceSheetsTableColumnHelper =
  createColumnHelper<PropertyBalanceSheet>();

const ParagraphHelper: FC<PropsWithChildren> = ({ children }) => (
  <p className="py-0.5">{children}</p>
);

export const propertyBalanceSheetsTableColumns = [
  propertyBalanceSheetsTableColumnHelper.accessor("account_code", {
    header: "GL account #",
    cell: (info) => (
      <ParagraphHelper>
        {formatAccountCodeWithHyphens(genericGetValue(info.getValue()))}
      </ParagraphHelper>
    ),
  }),

  propertyBalanceSheetsTableColumnHelper.accessor("account_description", {
    header: "Account Description",
    cell: (info) => (
      <ParagraphHelper>{genericGetValue(info.getValue())}</ParagraphHelper>
    ),
  }),

  propertyBalanceSheetsTableColumnHelper.accessor("month_end_balance", {
    header: "Month End Balance",
    cell: (info) => (
      <ParagraphHelper>
        {numberToDollar({
          value: info.getValue(),
          options: { minimumFractionDigits: 2 },
        })}
      </ParagraphHelper>
    ),
  }),
];

interface UsePropertyBalanceSheetsTableArgs {
  data: PropertyBalanceSheet[];
}
export const usePropertyBalanceSheetsTable = ({
  data,
}: UsePropertyBalanceSheetsTableArgs) => {
  return useReactTable({
    data,
    columns: propertyBalanceSheetsTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
