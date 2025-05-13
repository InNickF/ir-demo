import {
  AssetTotalDistributionsByType,
  AssetTotalDistributionsByTypeTotals,
} from "@/modules/assets/typings/properties";
import {
  ColumnDef,
  getCoreRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";

const baseKeysOrder: Array<keyof AssetTotalDistributionsByTypeTotals> = [
  "distributions",
  "actual_sales_distributions",
  "actual_refi_distributions",
  "actual_operations_distributions",
  "budget_total_distributions",
  "variance_distributions",
  "actual_contributions",
  "budget_contributions",
  "variance_contributions",
];

const keysOrder: Array<keyof AssetTotalDistributionsByType> = [
  "property",
  ...baseKeysOrder,
];

interface UseAssetTotalDistributionsByTypeTableParams {
  data: AssetTotalDistributionsByType[];
  columns: ColumnDef<AssetTotalDistributionsByType>[];
  state?: Partial<TableState>;
}
export const useAssetTotalDistributionsByTypeTable = ({
  state,
  columns,
  data = [],
}: UseAssetTotalDistributionsByTypeTableParams) => {
  return useReactTable({
    state: {
      ...state,
      columnOrder: keysOrder,
    },
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
};

interface UseAssetTotalDistributionsByTypeTotalsTableParams {
  data: AssetTotalDistributionsByTypeTotals[];
  columns: ColumnDef<AssetTotalDistributionsByTypeTotals>[];
  state?: Partial<TableState>;
}
export const useAssetTotalDistributionsByTypeTotalsTable = ({
  state,
  columns,
  data = [],
}: UseAssetTotalDistributionsByTypeTotalsTableParams) => {
  return useReactTable({
    state: {
      ...state,
      columnOrder: baseKeysOrder,
    },
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
};
