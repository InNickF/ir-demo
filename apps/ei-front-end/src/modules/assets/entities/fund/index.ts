import { assetsModuleRegistry } from "@/assets/index";
import { buildEntity } from "@/commons/model-in";
import { fundFormatter } from "./formatters";
import { fundListResource } from "./resources";
import { FundSchema } from "./schemas";

export const fundEntity = buildEntity({
  id: "fund",
  label: "Fund",
  pluralLabel: "Funds",
  idKey: "fund_name",
  labelKey: "fund_name",
  module: assetsModuleRegistry,
  schema: FundSchema,
  resource: fundListResource,
})
  .addFormatters(() => ({
    formatter: fundFormatter,
  }))
  .build();
