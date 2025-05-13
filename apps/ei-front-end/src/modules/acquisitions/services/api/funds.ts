import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { FundKPIsSchema } from "../../schemas/funds";

export const getFundsKPIs = async (filters: GenericFilterPayload) => {
  const finalFilter = { ...filters, phase__not__in: "DEAD,CLOSED" };
  const serializedQuery = querySerializer(finalFilter);

  const response = await privateAxios.get(
    `/acquisitions/deals/kpis-chart/${serializedQuery}`
  );
  return FundKPIsSchema.parse(response.data);
};
