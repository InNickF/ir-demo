import { z } from "zod";

export const DebtProperty = z.object({
  yardi_property_code: z.string().nullish(),
  fund_name: z.string().nullish(),
  address: z.string().nullish(),
  name: z.string().nullish(),
});
