import { GenericFilterPayloadSchema } from "@/commons/schemas/filters";
import { z } from "zod";

export const GenericReportsSpreadsheetSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  file: z.string().nullish(),
  created: z.string().nullish(),
  modified: z.string().nullish(),
});

export const GenericReportsSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  tag: z.string().nullish(),
  spreadsheet: GenericReportsSpreadsheetSchema.nullish(),
  spreadsheet_url: z.string().nullish(),
});

export const GenericExportReportsPayloadSchema = z.object({
  filters: GenericFilterPayloadSchema.nullish(),
});
