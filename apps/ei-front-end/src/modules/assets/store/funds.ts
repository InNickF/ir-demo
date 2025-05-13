import { Fund } from "@/assets/typings/funds";
import {
  FundsTableVisibilityState,
  getFundsTableInitialOrder,
  getFundsTableInitialVisibility,
} from "@/assets/utils/funds";
import { atomWithStorage } from "jotai/utils";

export const fundsTableColumnVisibilityAtom =
  atomWithStorage<FundsTableVisibilityState>(
    "assets-funds-table-column-visibility-v0.8",
    getFundsTableInitialVisibility()
  );

export const fundsTableColumnOrderAtom = atomWithStorage<Array<keyof Fund>>(
  "assets-funds-table-column-order-v0.8",
  getFundsTableInitialOrder()
);
