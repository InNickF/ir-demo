import { z } from "zod";

export const GenericTableDefinedNumbersSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  /* TODO: Delete them once backend stop sending those values */
  z.literal(7),
  z.literal(8),
]);

export const GenericTableTextAlignsSchema = z.union([
  z.literal("left"),
  z.literal("center"),
  z.literal("right"),
]);

export const GenericTableBorderLimitsSchema = z.object({
  top: GenericTableDefinedNumbersSchema.nullable(),
  bottom: GenericTableDefinedNumbersSchema.nullable(),
  left: GenericTableDefinedNumbersSchema.nullable(),
  right: GenericTableDefinedNumbersSchema.nullable(),
});

export const GenericTableMetadataSchema = z.object({
  bold: z.boolean().nullish(),
  underline: z.boolean().nullish(),
  border: GenericTableBorderLimitsSchema.nullish(),
  padding: GenericTableBorderLimitsSchema.nullish(),
  background: GenericTableDefinedNumbersSchema.nullish(),
  align: GenericTableTextAlignsSchema.nullish(),
  color: GenericTableDefinedNumbersSchema.nullish(),
  colspan: z.number().nullish(),
  rowspan: z.number().nullish(),
  table_header: z.boolean().nullish(),
  table_footer: z.boolean().nullish(),
});

export const GenericTableRowCellSchema = z.object({
  value: z.string().nullish(),
  metadata: GenericTableMetadataSchema.nullish(),
});

export const GenericTableRowColsSchema = z.object({
  key: z.string(),
  label: GenericTableRowCellSchema.nullish(), // IMPORTANT: This is representing a horizontal label, not all tables has this property.
  cells: z.array(GenericTableRowCellSchema).nullish(),
  metadata: GenericTableMetadataSchema.nullish(), // IMPORTANT: This metadata refers only to the row styles, label and cells metadata are in each one schema.
});
