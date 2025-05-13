import { z } from "zod";
import {
  FundKpiDataSchema,
  FundKpiMetricSchema,
  FundKpiSchema,
  FundLenderByLtvSchema,
  FundOutstandingBalanceByLenderSchema,
  FundMaturityLenderSchema,
} from "../schemas/fund";

export type FundKpiData = z.infer<typeof FundKpiDataSchema>;

export type FundKpiMetric = z.infer<typeof FundKpiMetricSchema>;

export type FundKpi = z.infer<typeof FundKpiSchema>;

export type FundLender = z.infer<typeof FundOutstandingBalanceByLenderSchema>;

export type FundMaturityLender = z.infer<typeof FundMaturityLenderSchema>;

export type FundLenderByLtv = z.infer<typeof FundLenderByLtvSchema>;
