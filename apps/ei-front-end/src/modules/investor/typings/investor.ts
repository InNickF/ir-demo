import { z } from "zod";
import { InvestorSchema } from "../schemas/investor";
import { GenericLabelValueObject } from "@/commons/typings";

export type Investor = z.infer<typeof InvestorSchema>;

export type InvestorReportParams = {
  investor: GenericLabelValueObject[];
  investment: GenericLabelValueObject[];
  asOfMonth: string;
  multipleFiles: string;
};
