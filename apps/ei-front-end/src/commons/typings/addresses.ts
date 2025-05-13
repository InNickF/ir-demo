import { z } from "zod";
import { GenericAddressLatLongSchema } from "../schemas/addresses";

export type GenericAddressLatLong = z.infer<typeof GenericAddressLatLongSchema>;
