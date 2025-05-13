import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { formatAccountCodeWithHyphens } from "@/modules/tools/utils";
import { PropertyAccountReceivable } from "@/tools/typings/property-level-validations";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, PropsWithChildren } from "react";

const propertyAccountReceivableTableColumnHelper =
  createColumnHelper<PropertyAccountReceivable>();

const ParagraphHelper: FC<PropsWithChildren> = ({ children }) => (
  <p className="py-0.5">{children}</p>
);

export const propertyAccountReceivableTableColumns = [
  propertyAccountReceivableTableColumnHelper.accessor("transaction_date", {
    header: "Transaction Date",
    cell: (info) => (
      <ParagraphHelper>
        {transformInputDateToMMDDYYYY(info.getValue())}
      </ParagraphHelper>
    ),
  }),
  propertyAccountReceivableTableColumnHelper.accessor(
    "transaction_control_code",
    {
      header: "Transaction Control Code",
      cell: (info) => (
        <ParagraphHelper>{genericGetValue(info.getValue())}</ParagraphHelper>
      ),
    }
  ),
  propertyAccountReceivableTableColumnHelper.accessor("person_name", {
    header: "Person Name",
    cell: (info) => (
      <ParagraphHelper>{genericGetValue(info.getValue())}</ParagraphHelper>
    ),
  }),

  propertyAccountReceivableTableColumnHelper.accessor("yardi_person_code", {
    header: "Yardi Person Code",
    cell: (info) => (
      <ParagraphHelper>
        {formatAccountCodeWithHyphens(genericGetValue(info.getValue()))}
      </ParagraphHelper>
    ),
  }),

  propertyAccountReceivableTableColumnHelper.accessor("amount", {
    header: "Amount",
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

interface UsePropertyAccountReceivableTableArgs {
  data: PropertyAccountReceivable[];
}
export const usePropertyAccountReceivableTable = ({
  data,
}: UsePropertyAccountReceivableTableArgs) => {
  return useReactTable({
    data,
    columns: propertyAccountReceivableTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
