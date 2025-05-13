import { z } from "zod";
import { FundKPIsSchema, FundSchema } from "../schemas/funds";

export type Fund = z.infer<typeof FundSchema>;

export type FundKPIs = z.infer<typeof FundKPIsSchema>;
