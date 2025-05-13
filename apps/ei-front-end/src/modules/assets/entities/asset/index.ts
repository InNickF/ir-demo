import { assetsModuleRegistry } from "@/assets/index";
import { buildEntity } from "@/commons/model-in";
import { assetsListResource } from "./resource";
import { PropertySchema } from "./schema";
import { propertyFormatter } from "./formatters";

export const assetEntity = buildEntity({
  module: assetsModuleRegistry,
  id: "asset",
  label: "Asset",
  pluralLabel: "Assets",
  idKey: "yardi_property_code",
  labelKey: "name",
  schema: PropertySchema,
  resource: assetsListResource,
})
  .addFormatters(() => ({
    formatter: propertyFormatter,
  }))
  .build();
