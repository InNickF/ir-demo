import { z } from "zod";

export const FundSchema = z.object({
  id: z.string(),
  created: z.string().nullish(),
  modified: z.string().nullish(),
  created_by: z.string().nullish(),
  modified_by: z.string().nullish(),
  name: z.string(),
});

export const FundKPIsSchema = z.object({
  deals: z.number().nullable(),
  equity: z.number().nullable(),
  cost: z.number().nullable(),
  sf: z.number().nullable(),
});
