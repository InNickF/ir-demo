import {
  buildResource,
  createResourceResolverCallback,
} from "@/commons/model-in";
import { resourceFiltersPicker } from "@/commons/model-in/resources/filters/utils";
import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { z } from "zod";
import { assetsFilters } from "../../resources/filters";
import { PropertySchema } from "./schema";

export const assetsListResource = buildResource({
  id: "assets",
  label: "Assets List",
  schema: z.array(PropertySchema),
  staticFilters: {
    page_size: "-1",
  },
  sharedFilters: resourceFiltersPicker({
    resourceFilter: assetsFilters,
    filters: ["search", "status", "fund"],
  }),
})
  .addResolver(
    createResourceResolverCallback({
      path: "/data-asset/properties-under-management/",
      mod: ({ data }) =>
        PaginatedResponseSchema(PropertySchema).parse(data).results || [],
    })
  )
  .build();
