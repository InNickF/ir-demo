import { DealPhase } from "@/acquisitions/typings/deals";
import { genericGetValue } from "@/commons/model-in/formatters/utils";

export const dealPhaseNameFormatter: Record<
  DealPhase,
  (value: DealPhase) => string
> = {
  SCREENING: () => "Screening",
  LOI: (value) => genericGetValue(value),
  PSA: (value) => genericGetValue(value),
  DD: () => "DD/Legal",
  CLOSING: () => "Closing",
  CLOSED: () => "Closed",
  DEAD: () => "Dead",
};
