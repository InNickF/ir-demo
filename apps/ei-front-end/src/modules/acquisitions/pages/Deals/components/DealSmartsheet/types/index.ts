import {
  BasicDealInformation,
  DealPhase,
} from "@/modules/acquisitions/typings/deals";
import { dealSmartsheetTableSection } from "../utils";

export interface HeaderTableData {
  id: DealPhase;
  phase: typeof dealSmartsheetTableSection[number];
  isHeader: true;
}

export interface ActiveDealData {
  deal: BasicDealInformation;
  ref: HTMLElement;
}

export type OverItem = ActiveDealData | HeaderTableData;
