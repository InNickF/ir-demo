import { fundEntity } from "@/assets/entities/fund";
import {
  buildModel,
  buildResource,
  createResourceResolverCallback,
} from "@/commons/model-in";
import { resourceFiltersPicker } from "@/commons/model-in/resources/filters/utils";
import { assetsFilters } from "@/modules/assets/resources/filters";
import { z } from "zod";
import { fundFormatter } from "../../formatters";
import { FundSchema } from "../../schemas";

export const fundListResource = buildResource({
  id: "funds-list",
  label: "Funds List",
  pluralLabel: "Funds",
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

export const fundListModel = buildModel({
  entity: fundEntity,
  schema: FundSchema,
  resource: fundListResource,
})
  .addFormatters(() => ({
    formatter: fundFormatter,
  }))
  .build();
