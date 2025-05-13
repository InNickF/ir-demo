import { z } from "zod";

export const DjangoStringErrorDetailSchema = z.string();

export const DjangoObjectsErrorDetailSchema = z.array(
  z.object({
    field: z.string(),
    attr: z.string().nullish(),
    error: z.string(),
    value: z.string().nullish(),
  })
);

export const DjangoErrorSchema = <
  TDetail extends
    | typeof DjangoStringErrorDetailSchema
    | typeof DjangoObjectsErrorDetailSchema
>(
  detail: TDetail
) =>
  z.object({
    result: z.literal("error"),
    detail: detail,
  });

export const DjangoStringErrorSchema = DjangoErrorSchema(
  DjangoStringErrorDetailSchema
);
export const DjangoObjectsErrorSchema = DjangoErrorSchema(
  DjangoObjectsErrorDetailSchema
);
