import {
  fundsTableColumnOrderAtom,
  fundsTableColumnVisibilityAtom,
} from "@/assets/store/funds";
import { Fund } from "@/assets/typings/funds";
import {
  ColumnDef,
  getCoreRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";
import { useAtom } from "jotai";

interface UseFundsTableProps {
  data: Fund[];
  columns: ColumnDef<Fund>[];
  state?: Partial<TableState>;
}
export const useFundsTable = ({
  state,
  columns,
  data = [],
}: UseFundsTableProps) => {
  const [fundsTableVisibility] = useAtom(fundsTableColumnVisibilityAtom);
  const [fundsTableOrder] = useAtom(fundsTableColumnOrderAtom);

  return useReactTable({
    state: {
      ...state,
      columnVisibility: fundsTableVisibility,
      columnOrder: fundsTableOrder,
    },
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
};
