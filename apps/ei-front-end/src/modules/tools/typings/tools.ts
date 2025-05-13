import { z } from "zod";
import {
  UploadDataFromExcelPayloadSchema,
  UploadLoanAbstractPayloadSchema,
} from "../schemas/tools";
import { EXCEL_DATA_TYPES } from "../utils";

export type ExcelDataTypes = typeof EXCEL_DATA_TYPES[number];

export type UploadDataFromExcelPayload = z.infer<
  typeof UploadDataFromExcelPayloadSchema
>;

export type UploadLoanAbstractPayload = z.infer<
  typeof UploadLoanAbstractPayloadSchema
>;
