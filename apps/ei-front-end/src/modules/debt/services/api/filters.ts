import { GenericChoicesSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";

export const getPortfolioSummaryFilters = async () => {
  const response = await privateAxios.get("/debt/fund-level/filters/");

  return GenericChoicesSchema().parse(response.data);
};

export const getDebtFilters = async () => {
  const response = await privateAxios.get("/data-debt/choices/");

  return GenericChoicesSchema().parse(response.data);
};
