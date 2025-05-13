export type TriggerType = "next" | "prev" | "page";

export type TriggerState = {
  type: TriggerType;
  pageNumber: number;
};
