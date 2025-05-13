import {
  propertiesTableColumnOrderAtom,
  propertiesTableColumnVisibilityAtom,
} from "@/assets/store/properties";
import { Property } from "@/assets/typings/properties";
import {
  ColumnDef,
  getCoreRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";
import { useAtom } from "jotai";

interface UsePropertiesTableProps {
  data: Property[];
  columns: ColumnDef<Property>[];
  state?: Partial<TableState>;
}
export const usePropertiesTable = ({
  state,
  columns,
  data = [],
}: UsePropertiesTableProps) => {
  const [assetsTableVisibility] = useAtom(propertiesTableColumnVisibilityAtom);
  const [assetsTableOrder] = useAtom(propertiesTableColumnOrderAtom);

  return useReactTable({
    state: {
      ...state,
      columnVisibility: assetsTableVisibility,
      columnOrder: assetsTableOrder,
    },
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
};
