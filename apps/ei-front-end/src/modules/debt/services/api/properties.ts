import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { DebtProperty } from "../../schemas/properties";

export interface GetDebtPropertiesFilters extends GenericFilterPayload {
  fund_name?: string;
}
export const getDebtProperties = async (filters: GetDebtPropertiesFilters) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-asset/properties-under-management/choices/${serializedQuery}`
  );

  return PaginatedResponseSchema(DebtProperty).parse(response.data);
};
