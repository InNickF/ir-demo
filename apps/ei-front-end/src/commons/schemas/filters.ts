import { z } from "zod";

export const PaginatedResponseSchema = <Result extends z.ZodTypeAny>(
  resultSchema: Result
) =>
  z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
    count: z.number().nullable(),
    total_pages: z.number().nullable(),
    results: z.array(resultSchema).nullable(),
  });

export const LegacyGenericLabelValueObjectSchema = <
  TValue extends z.ZodType = z.ZodType<string>
>(
  valueSchema: TValue = z.string() as unknown as TValue
) => GenericLabelValueObjectSchema(valueSchema);

export const GenericLabelValueObjectSchema = <
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
>(
  valueSchema: TValue = z.string() as unknown as TValue,
  labelSchema: TLabel = z.string() as unknown as TLabel
) =>
  z.object({
    label: labelSchema,
    value: valueSchema,
  });

export const GenericChoiceSchema = <
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
>(
  valueSchema: TValue = z.string() as unknown as TValue,
  labelSchema: TLabel = z.string() as unknown as TLabel
) =>
  z.object({
    key: z.string(),
    name: z.string(),
    options: z.array(GenericLabelValueObjectSchema(valueSchema, labelSchema)),
  });

export const GenericChoicesSchema = <
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
>(
  valueSchema: TValue = z.string() as unknown as TValue,
  labelSchema: TLabel = z.string() as unknown as TLabel
) => z.array(GenericChoiceSchema(valueSchema, labelSchema));

export const GenericFilterPayloadSchema = z.record(
  z.union([
    z.string(),
    z.array(z.string()),
    z.boolean(),
    z.record(z.union([z.string(), z.array(z.string()), z.boolean()])),
  ])
);

export const GenericSelectOptionsSchema = z.record(
  z.union([z.string(), z.number(), z.null()])
);

export const InitialFiltersSchema = z.record(
  z.union([z.string(), z.number(), z.boolean(), z.null()]).nullish()
);

interface GenericLabelValueMetadata<
  TMetaData extends z.ZodType = z.ZodType<unknown>,
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
> {
  metadataSchema?: TMetaData;
  valueSchema?: TValue;
  labelSchema?: TLabel;
}
export const GenericLabelValueMetadataSchema = <
  TMetaData extends z.ZodType = z.ZodType<unknown>,
  TValue extends z.ZodType = z.ZodType<string>,
  TLabel extends z.ZodType = z.ZodType<string>
>({
  metadataSchema = z.unknown() as unknown as TMetaData,
  valueSchema = z.string() as unknown as TValue,
  labelSchema = z.string() as unknown as TLabel,
}: GenericLabelValueMetadata<TMetaData, TValue, TLabel>) =>
  z.object({
    label: labelSchema,
    value: valueSchema,
    metadata: metadataSchema,
  });
