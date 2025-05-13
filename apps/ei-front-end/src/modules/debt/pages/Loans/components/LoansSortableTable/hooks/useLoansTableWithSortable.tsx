import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ReactNode, useMemo } from "react";

import { DebtLoan } from "@/modules/debt/typings/loans";
import {
  loansColumnsTable,
  loansTableColumnHelper,
} from "../utils/loansColumnsTable";

interface useLoansTableWithSortableArgs {
  data: DebtLoan[];
  sortableCell?: (deal: DebtLoan) => ReactNode;
}

export const sortableCellId = "sortable";

export const useLoansTableWithSortable = ({
  data = [],
  sortableCell,
}: useLoansTableWithSortableArgs) => {
  const columns = useMemo(
    () => [
      loansTableColumnHelper.display({
        id: sortableCellId,
        header: "",
        cell: (props) => sortableCell?.(props.row.original) || null,
      }),
      ...loansColumnsTable,
    ],
    [sortableCell]
  );
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};
