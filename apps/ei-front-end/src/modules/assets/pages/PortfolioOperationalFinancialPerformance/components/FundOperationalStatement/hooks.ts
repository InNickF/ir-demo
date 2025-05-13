import { FundOperationalStatement } from "@/modules/assets/typings/operational-financial-performance";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { useMemo } from "react";
import {
  fundOperationalStatementMetricsOrderAtom,
  fundOperationalStatementMetricsVisibilityAtom,
} from "./store";
import {
  fundOperationalStatementTableColumns,
  getOperationalStatementComputedColumnsOrder,
} from "./utils";

interface UseFundOperationalStatementTableParams {
  data: FundOperationalStatement[];
  activeComparison: string;
}
export const useFundOperationalStatementTable = ({
  data,
  activeComparison,
}: UseFundOperationalStatementTableParams) => {
  const [columnVisibility] = useAtom(
    fundOperationalStatementMetricsVisibilityAtom
  );

  const [order] = useAtom(fundOperationalStatementMetricsOrderAtom);
  const columnOrder = useMemo(() => {
    return getOperationalStatementComputedColumnsOrder({
      items: order,
    });
  }, [order]);

  return useReactTable({
    data,
    columns: fundOperationalStatementTableColumns({ activeComparison }),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
      columnOrder,
    },
  });
};
