import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { DebtLoanTimelineSchema } from "../../schemas/loans";
import { OverviewDebtInformationSchema } from "../../schemas/overview";

export const getOverviewDebtInformation = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-asset/portfolios/metrics-debt/${serializedQuery}`
  );

  return OverviewDebtInformationSchema.parse(response?.data);
};

export interface GetOverviewTimelineFilters extends GenericFilterPayload {
  fund: string;
}
export const getOverviewTimeline = async (
  filters: GetOverviewTimelineFilters
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/debt/loan-abstract-timelines/${serializedQuery}`
  );

  return PaginatedResponseSchema(DebtLoanTimelineSchema).parse(response?.data);
};
