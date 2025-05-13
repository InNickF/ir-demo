import { z } from "zod";
import { DebtProperty } from "../schemas/properties";

export type DebtProperty = z.infer<typeof DebtProperty>;
