import { z } from "zod";

export const FileSchema =
  typeof window === "undefined" ? z.any() : z.instanceof(File);

export const AttachmentsCommonKeysSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  key: z.string().nullish(),
  file: z.string().nullish(),
  uploaded_at: z.string().nullish(),
});
