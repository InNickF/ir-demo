import {
  buildModel,
  buildResource,
  createResourceResolverCallback,
} from "@/commons/model-in";
import { resourceFiltersPicker } from "@/commons/model-in/resources/filters/utils";
import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { assetsFilters } from "@/modules/assets/resources/filters";
import { z } from "zod";
import { assetEntity } from "../..";
import { propertyFormatter } from "../../formatters";
import { PropertySchema } from "../../schema";

export const assetsListResource = buildResource({
  id: "assets-list",
  label: "Assets List",
  pluralLabel: "Assets",
  schema: z.array(PropertySchema),
  sharedFilters: resourceFiltersPicker({
    resourceFilter: assetsFilters,
    filters: ["search", "status", "fund"],
  }),
  staticFilters: {
    page_size: "-1",
  },
})
  .addResolver(
    createResourceResolverCallback({
      path: "/data-asset/properties-under-management/",
      mod: ({ data }) =>
        PaginatedResponseSchema(PropertySchema).parse(data).results || [],
    })
  )
  .build();

export const assetsListModel = buildModel({
  entity: assetEntity,
  schema: PropertySchema,
  resource: assetsListResource,
})
  .addFormatters(() => ({
    formatter: propertyFormatter,
  }))
  .build();
