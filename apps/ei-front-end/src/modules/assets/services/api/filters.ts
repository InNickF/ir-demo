import { GenericChoicesSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import { FilterType, OptionType } from "in-ui-react";

export const legacyGetAssetGrowthFilters = async () => {
  const response = await privateAxios.get("/asset/growth/filters");
  return response.data as FilterType<OptionType>[];
};

export const getPortfolioGrowthFilters = async () => {
  const response = await privateAxios.get("/asset/portfolio/growth/filters");
  return response.data as FilterType<OptionType>[];
};

export const getPortfolioSummaryFilters = async () => {
  const response = await privateAxios.get("/asset/portfolio-summary/filters");
  return response.data as FilterType<OptionType>[];
};

export const getPropertySummaryFilters = async () => {
  const response = await privateAxios.get("/asset/property-summary/filters");
  return response.data as FilterType<OptionType>[];
};

export const getAssetsFilters = async () => {
  const response = await privateAxios.get("/data-asset/choices/");
  return GenericChoicesSchema().parse(response.data);
};

export const getAssetGrowthFilters = async () => {
  const response = await privateAxios.get("/data-asset/asset-growth/choices/");
  return response.data as FilterType<OptionType>[];
};
