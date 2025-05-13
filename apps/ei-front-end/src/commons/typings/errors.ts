import {
  DjangoErrorSchema,
  DjangoObjectsErrorDetailSchema,
  DjangoObjectsErrorSchema,
  DjangoStringErrorDetailSchema,
  DjangoStringErrorSchema,
} from "@/commons/schemas/errors";
import { z } from "zod";

export type DjangoStringErrorDetail = z.infer<
  typeof DjangoStringErrorDetailSchema
>;
export type DjangoObjectErrorDetail = z.infer<
  typeof DjangoObjectsErrorDetailSchema
>;

export type DjangoError = z.infer<ReturnType<typeof DjangoErrorSchema>>;

export type DjangoStringError = z.infer<typeof DjangoStringErrorSchema>;
export type DjangoObjectsError = z.infer<typeof DjangoObjectsErrorSchema>;
