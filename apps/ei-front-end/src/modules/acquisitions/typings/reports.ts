import { z } from "zod";
import {
  GenericReportsSchema,
  GenericReportsSpreadsheetSchema,
  GenericExportReportsPayloadSchema,
} from "../schemas/reports";

export type GenericReportsSpreadsheet = z.infer<
  typeof GenericReportsSpreadsheetSchema
>;

export type GenericReports = z.infer<typeof GenericReportsSchema>;

export type GenericExportReportsPayload = z.infer<
  typeof GenericExportReportsPayloadSchema
>;
