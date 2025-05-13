import { Deal } from "@/modules/acquisitions/typings/deals";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { dealColumnsTable } from "../utils/dealColumnsTable";

interface UseDealsTableArgs {
  data: Deal[];
  extraFirstColumns?: typeof dealColumnsTable;
}
export const useDealsTable = ({
  data,
  extraFirstColumns = [],
}: UseDealsTableArgs) => {
  const columns = useMemo(
    () => [...extraFirstColumns, ...dealColumnsTable],
    [extraFirstColumns]
  );
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};
