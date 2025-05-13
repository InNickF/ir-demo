import { z } from "zod";
import {
  ARChartItemSchema,
  ARChartValueItemSchema,
  ARChartValueLabelsSchema,
  GavPortfolioSchema,
  LegacyLeasePortfolioSchema,
  LoanExpirationSchema,
  LoanPortfolioStackGraphSchema,
  QuarterlyPortfolioSchema,
} from "../schemas/portfolio";
import {
  ARPropertyTableSchema,
  ARTenantDrillDownTableSchema,
  ARTenantDrillDownTotalsSchema,
  ARTenantRowSchema,
} from "../schemas/property";

export type FundId = string;

export type GavPortfolio = z.infer<typeof GavPortfolioSchema>;

export type LegacyLeasePortfolio = z.infer<typeof LegacyLeasePortfolioSchema>;

export type LoanPortfolioStackGraph = z.infer<
  typeof LoanPortfolioStackGraphSchema
>;

export type QuarterlyPortfolio = z.infer<typeof QuarterlyPortfolioSchema>;

export interface PropertyGeographyMapProps {
  statusFilter?: string[];
  lendersFilter?: string[];
  regionsFilter?: string[];
  fundFilter?: string;
}

export type ARPropertyTable = z.infer<typeof ARPropertyTableSchema>;

export type ARTenantDrillDownTotals = z.infer<
  typeof ARTenantDrillDownTotalsSchema
>;

export type ARTenantDrillDownTable = z.infer<
  typeof ARTenantDrillDownTableSchema
>;
export type ARTenantRow = z.infer<typeof ARTenantRowSchema>;

export type ARChartValueLabels = z.infer<typeof ARChartValueLabelsSchema>;
export type ARChartValueItem = z.infer<typeof ARChartValueItemSchema>;
export type ARChartItem = z.infer<typeof ARChartItemSchema>;

export type LoanExpiration = z.infer<typeof LoanExpirationSchema>;
