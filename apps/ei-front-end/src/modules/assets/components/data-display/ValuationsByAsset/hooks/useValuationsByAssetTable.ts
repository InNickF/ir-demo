import {
  ValuationsByAsset,
  ValuationsByAssetTotals,
} from "@/modules/assets/typings/properties";
import {
  ColumnDef,
  getCoreRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";

const baseKeysOrder: Array<keyof ValuationsByAssetTotals> = [
  "current_irr",
  "current_moc",
  "projected_irr",
  "projected_moc",
  "total_gav",
  "total_nav",
];

const keysOrder: Array<keyof ValuationsByAsset> = [
  "property",
  ...baseKeysOrder,
];

interface UseValuationsByAssetTableParams {
  data: ValuationsByAsset[];
  columns: ColumnDef<ValuationsByAsset>[];
  state?: Partial<TableState>;
}
export const useValuationsByAssetTable = ({
  state,
  columns,
  data = [],
}: UseValuationsByAssetTableParams) => {
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

interface UseValuationsByAssetTotalsTableParams {
  data: ValuationsByAssetTotals[];
  columns: ColumnDef<ValuationsByAssetTotals>[];
  state?: Partial<TableState>;
}
export const useValuationsByAssetTotalsTable = ({
  state,
  columns,
  data = [],
}: UseValuationsByAssetTotalsTableParams) => {
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
