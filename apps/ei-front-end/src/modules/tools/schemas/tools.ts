import { GenericLabelValueObjectSchema } from "@/commons/schemas/filters";
import { z } from "zod";
import { EXCEL_DATA_TYPES } from "../utils";

export const UploadLoanAbstractPayloadSchema = z.object({
  file: typeof window === "undefined" ? z.any() : z.instanceof(File),
  scode: z.string(),
});

export const UploadDataFromExcelPayloadSchema = z.object({
  file: typeof window === "undefined" ? z.any() : z.instanceof(File),
  fund: GenericLabelValueObjectSchema(),
  fileType: z.enum(EXCEL_DATA_TYPES),
  quarter: GenericLabelValueObjectSchema(),
  year: GenericLabelValueObjectSchema(),
});
