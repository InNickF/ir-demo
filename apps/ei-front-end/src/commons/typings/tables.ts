import { z } from "zod";
import {
  GenericTableMetadataSchema,
  GenericTableDefinedNumbersSchema,
  GenericTableRowColsSchema,
  GenericTableBorderLimitsSchema,
} from "../schemas/tables";

export type GenericTableDefinedNumbers = z.infer<
  typeof GenericTableDefinedNumbersSchema
>;

export type GenericTableBorderLimits = z.infer<
  typeof GenericTableBorderLimitsSchema
>;

export type GenericTableMetadata = z.infer<typeof GenericTableMetadataSchema>;

export type GenericTableRowCols = z.infer<typeof GenericTableRowColsSchema>;
