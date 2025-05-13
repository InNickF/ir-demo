import { CompstackCompId } from "@/modules/acquisitions/typings/market-analytics";

export interface ActiveCompIdState {
  activeCompId: CompstackCompId | null;
  moveToComp?: boolean;
}
