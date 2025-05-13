export interface HeaderTableData {
  id: string;
  isHeader: true;
}

export interface ActiveDealData {
  ref: HTMLElement;
}

export type OverItem = ActiveDealData | HeaderTableData;
