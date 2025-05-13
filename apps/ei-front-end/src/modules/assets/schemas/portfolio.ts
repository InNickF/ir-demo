import { z } from "zod";
import { AR_CHART_VALUE_LABELS } from "../utils";

export const GavPortfolioSchema = z.object({
  gav: z.number().nullish(),
  fund: z.string().nullish(),
  region: z.string().nullish(),
  status: z.string().nullish(),
  saddr1: z.string().nullish(),
});

export const LoanPortfolioStackGraph = z.record(
  z.string(),
  z.string().or(z.number())
);

export const LoanPortfolioStackGraphByYear = z.object({
  year: z.string(),
});

export const LoanPortfolioStackGraphSchema = z.intersection(
  LoanPortfolioStackGraph,
  LoanPortfolioStackGraphByYear
);

export const LeasePortfolio = z.record(z.string(), z.string().or(z.number()));

export const LeasePortfolioSchemaByYear = z.object({
  year: z.string(),
});

export const LegacyLeasePortfolioSchema = z.intersection(
  LeasePortfolio,
  LeasePortfolioSchemaByYear
);

export const StackedGraphSchema = z.record(
  z.string(),
  z.string().or(z.number())
);

export const StackedGraphSchemaByYear = z.object({
  year: z.string(),
});

export const StackedGraphPortfolio = z.intersection(
  StackedGraphSchema,
  StackedGraphSchemaByYear
);

export const QuarterlyPortfolioSchema = z.object({
  investment: z.number().nullish(),
  distribution: z.number().nullish(),
  fund: z.string().nullish(),
  nav: z.number().nullish(),
  date: z.string().nullish(),
  appreciation: z.number().nullish(),
  quarter: z.string().nullish(),
});

export const ARChartValueLabelsSchema = z.enum(AR_CHART_VALUE_LABELS);

export const ARChartValueItemSchema = z.object({
  label: ARChartValueLabelsSchema,
  value: z.number(),
});

export const ARChartItemSchema = z.object({
  label: z.string(),
  value: z.array(ARChartValueItemSchema),
});

export const LoanExpirationSchema = z.object({
  initial_maturity_year: z.number().nullish(),
  lender_name: z.string().nullish(),
  current_outstanding_loan_balance: z.number().nullish(),
  loan_name: z.string().nullish(),
});
