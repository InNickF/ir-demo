import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { formatAccountCodeWithHyphens } from "@/modules/tools/utils";
import { PropertyGeneralLedger } from "@/tools/typings/property-level-validations";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, PropsWithChildren } from "react";

const propertyGeneralLedgerTableColumnHelper =
  createColumnHelper<PropertyGeneralLedger>();

const ParagraphHelper: FC<PropsWithChildren> = ({ children }) => (
  <p className="py-0.5">{children}</p>
);

export const propertyGeneralLedgerTableColumns = [
  propertyGeneralLedgerTableColumnHelper.accessor("account_code", {
    header: "GL account #",
    cell: (info) => (
      <ParagraphHelper>
        {formatAccountCodeWithHyphens(genericGetValue(info.getValue()))}
      </ParagraphHelper>
    ),
  }),
  propertyGeneralLedgerTableColumnHelper.accessor("account_description", {
    header: "GL account name",
    cell: (info) => (
      <ParagraphHelper>{genericGetValue(info.getValue())}</ParagraphHelper>
    ),
  }),
  propertyGeneralLedgerTableColumnHelper.accessor(
    "month_to_date_balance_activity",
    {
      header: "Month Activity",
      cell: (info) => (
        <ParagraphHelper>
          {numberToDollar({
            value: info.getValue(),
            options: { minimumFractionDigits: 2 },
          })}
        </ParagraphHelper>
      ),
    }
  ),
  propertyGeneralLedgerTableColumnHelper.accessor("month_start_balance", {
    header: "Month Start Balance",
    cell: (info) => (
      <ParagraphHelper>
        {numberToDollar({
          value: info.getValue(),
          options: { minimumFractionDigits: 2 },
        })}
      </ParagraphHelper>
    ),
  }),
  propertyGeneralLedgerTableColumnHelper.accessor("month_end_balance", {
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

interface usePropertyGeneralLedgerTableArgs {
  data: PropertyGeneralLedger[];
}
export const usePropertyGeneralLedgerTable = ({
  data,
}: usePropertyGeneralLedgerTableArgs) => {
  return useReactTable({
    data,
    columns: propertyGeneralLedgerTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
