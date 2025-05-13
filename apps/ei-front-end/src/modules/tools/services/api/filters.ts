import { GenericChoicesSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import { OptionType, SelectFilterType } from "in-ui-react";

export const getAssetPropertiesFilters = async () => {
  const response = await privateAxios.get("/asset/property-summary/filters");
  return response.data[0] as SelectFilterType<OptionType>;
};

export const getValidationsChoices = async () => {
  const response = await privateAxios.get("/data-validations/choices/");
  return GenericChoicesSchema().parse(response.data);
};
