import { Color } from "in-ui-react";
import {
  listValidationDashboardFilters,
  listValidationDashboardViews,
} from "./utils";

export type ListValidationDashboardFilter =
  typeof listValidationDashboardFilters[number];

export type ListValidationDashboardView =
  typeof listValidationDashboardViews[number];

export interface PanelFilter {
  label: string;
  quantity: number;
  value: ListValidationDashboardFilter;
  color: Extract<Color, "primary" | "error" | "success">;
  description: string;
  disabled?: boolean;
}
