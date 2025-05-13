import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { numberToDollar } from "@/commons/model-in/formatters/utils/amount-conversions";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { formatAccountCodeWithHyphens } from "@/modules/tools/utils";
import { PropertyJournalEntry } from "@/tools/typings/property-level-validations";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, PropsWithChildren } from "react";

const propertyJournalEntriesTableColumnHelper =
  createColumnHelper<PropertyJournalEntry>();

const ParagraphHelper: FC<PropsWithChildren> = ({ children }) => (
  <p className="py-0.5">{children}</p>
);

export const propertyJournalEntriesTableColumns = [
  propertyJournalEntriesTableColumnHelper.accessor("transaction_date", {
    header: "Transaction Date",
    cell: (info) => (
      <ParagraphHelper>
        {transformInputDateToMMDDYYYY(info.getValue())}
      </ParagraphHelper>
    ),
  }),
  propertyJournalEntriesTableColumnHelper.accessor("transaction_control_code", {
    header: "Transaction Control Code",
    cell: (info) => (
      <ParagraphHelper>{genericGetValue(info.getValue())}</ParagraphHelper>
    ),
  }),
  propertyJournalEntriesTableColumnHelper.accessor("account_code", {
    header: "GL account #",
    cell: (info) => (
      <ParagraphHelper>
        {formatAccountCodeWithHyphens(genericGetValue(info.getValue()))}
      </ParagraphHelper>
    ),
  }),
  propertyJournalEntriesTableColumnHelper.accessor("account_description", {
    header: "Account Description",
    cell: (info) => (
      <ParagraphHelper>{genericGetValue(info.getValue())}</ParagraphHelper>
    ),
  }),
  propertyJournalEntriesTableColumnHelper.accessor("amount", {
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

interface UsePropertyJournalEntriesTableArgs {
  data: PropertyJournalEntry[];
}
export const usePropertyJournalEntriesTable = ({
  data,
}: UsePropertyJournalEntriesTableArgs) => {
  return useReactTable({
    data,
    columns: propertyJournalEntriesTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });
};
