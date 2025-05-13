import {
  buildResource,
  createResourceResolverCallback,
} from "@/commons/model-in";
import { z } from "zod";
import { assetsFilters } from "../../resources/filters";
import { resourceFiltersPicker } from "@/commons/model-in/resources/filters/utils";
import { FundSchema } from "./schemas";

export const fundListResource = buildResource({
  id: "funds",
  label: "Funds List",
  schema: z.array(FundSchema),
  sharedFilters: resourceFiltersPicker({
    resourceFilter: assetsFilters,
    filters: ["status"],
  }),
})
  .addResolver(
    createResourceResolverCallback({
      path: "/data-asset/portfolios/",
    })
  )
  .build();
