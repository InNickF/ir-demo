import { atomWithStorage } from "jotai/utils";
import {
  FundOperationalStatementBaseMetrics,
  FundOperationalStatementColumnVisibilityState,
  getOperationalStatementColumnsInitialOrderState,
  getOperationalStatementColumnsInitialVisibility,
} from "./utils";

export const fundOperationalStatementMetricsOrderAtom = atomWithStorage<
  FundOperationalStatementBaseMetrics[]
>(
  "assets-fund-operational-statement-metrics-order-v0.1",
  getOperationalStatementColumnsInitialOrderState()
);

export const fundOperationalStatementMetricsVisibilityAtom =
  atomWithStorage<FundOperationalStatementColumnVisibilityState>(
    "assets-fund-operational-statement-metrics-visibility-v0.1",
    getOperationalStatementColumnsInitialVisibility()
  );
