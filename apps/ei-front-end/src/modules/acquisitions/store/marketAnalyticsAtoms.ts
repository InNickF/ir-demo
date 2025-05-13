import { GenericLabelValueObject } from "@/commons/typings";
import { atomWithStorage } from "jotai/utils";

export const marketAnalyticsPageMarketFilterAtom =
  atomWithStorage<GenericLabelValueObject>(
    "acq-market-analytics-page-market-filter",
    { label: "South Florida", value: "South Florida" }
  );
