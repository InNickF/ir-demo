import { z } from "zod";

export const GenericAddressLatLongSchema = z.object({
  address: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});
