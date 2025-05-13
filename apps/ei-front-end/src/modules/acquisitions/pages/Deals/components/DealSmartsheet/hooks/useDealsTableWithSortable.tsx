import { Deal } from "@/modules/acquisitions/typings/deals";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ReactNode, useMemo } from "react";
import {
  dealsTableColumnHelper,
  editableDealColumnsTable,
} from "../../../utils/dealColumnsTable";

interface useDealsTableWithSortableArgs {
  data: Deal[];
  sortableCell?: (deal: Deal) => ReactNode;
}

export const sortableCellId = "sortable";

export const useDealsTableWithSortable = ({
  data = [],
  sortableCell,
}: useDealsTableWithSortableArgs) => {
  return useReactTable({
    data,
    columns: editableDealColumnsTable,
    getCoreRowModel: getCoreRowModel(),
  });
};
