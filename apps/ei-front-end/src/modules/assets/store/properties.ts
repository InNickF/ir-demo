import { atomWithStorage } from "jotai/utils";
import { Property } from "../typings/properties";
import {
  getPropertiesTableInitialOrder,
  getPropertiesTableInitialVisibility,
  PropertiesTableVisibilityState,
} from "../utils/properties";

export const propertiesTableColumnVisibilityAtom =
  atomWithStorage<PropertiesTableVisibilityState>(
    "assets-properties-table-column-visibility-v1.2",
    getPropertiesTableInitialVisibility()
  );

export const propertiesTableColumnOrderAtom = atomWithStorage<
  Array<keyof Property>
>(
  "assets-properties-table-column-order-v1.2",
  getPropertiesTableInitialOrder()
);
