import { Deal, DealPhase } from "@/modules/acquisitions/typings/deals";
import { OverItem } from "../types";

export const dealSmartsheetTableSection = [
  "SCREENING",
  "LOI",
  "PSA",
  "DD",
  "CLOSED",
  "DEAD",
] as const;

export const getDealSmartsheetOverItemId = (overItem: OverItem): Deal["id"] => {
  const isHeader = "isHeader" in overItem;
  return isHeader ? overItem.id : overItem?.deal?.id;
};

export const getDealSmartsheetOverItemPhase = (
  overItem: OverItem
): DealPhase => {
  const isHeader = "isHeader" in overItem;
  return isHeader ? overItem.phase : overItem?.deal?.phase?.value;
};

export const getPreviousDealSmartsheetSection = (
  currentSection: typeof dealSmartsheetTableSection[number]
): DealPhase | null => {
  const index = dealSmartsheetTableSection.indexOf(currentSection);
  const previousSection = dealSmartsheetTableSection[index - 1];
  return previousSection || null;
};

export const dealSmartsheetTableCommonFilters = {
  page_size: "-1",
};
