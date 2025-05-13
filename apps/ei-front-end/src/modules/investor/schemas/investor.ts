import { z } from "zod";


export const InvestorSchema = z.object({
    investor_code: z.string().nullish(),
    investor: z.string().nullish(),
});

export const InvestmentSchema = z.object({
  investment_code: z.string().nullish(),
  investment: z.string().nullish(),
});

export const InvestorSpreadsheetSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  file: z.string().nullish(),
  created: z.string().nullish(),
  modified: z.string().nullish(),
});

export const InvestorReportsSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  tag: z.string().nullish(),
  spreadsheet: InvestorSpreadsheetSchema.nullish(),
  spreadsheet_url: z.string().nullish(),
});