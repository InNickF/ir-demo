import { z } from "zod";
import {
  KpiCashflowSchema,
  KpiPortfolioSchema,
  KpiTenantPropertySchema,
} from "../schemas/kpis";

export type KpiCashFlow = z.infer<typeof KpiCashflowSchema>;

export type KpiTenantProperty = z.infer<typeof KpiTenantPropertySchema>;

export type KpiPortfolio = z.infer<typeof KpiPortfolioSchema>;

export interface KpiPortfolioRequest {
  filter: string;
  otherFilter?: {
    status: string[] | string;
    lenders: string[] | string;
    regions: string[] | string;
    fund: string[] | string;
  };
  source?: string;
  type?: number;
}
