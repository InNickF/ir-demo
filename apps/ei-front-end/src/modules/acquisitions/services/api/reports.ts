import { privateAxios } from "@/commons/services/clients";
import { GenericReportsSchema } from "../../schemas/reports";
import { GenericExportReportsPayload } from "../../typings/reports";
import { querySerializer } from "@/commons/utils/query-serializer";

export const getEquityRequirementsReport = async ({
  filters,
}: GenericExportReportsPayload) => {
  const finalFilters = {
    report_type: "cash_requirements_report",
    phase__not_in: "DEAD,CLOSED",
    ...filters,
  };

  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.post(
    `/reports/reports/${serializedQuery}`
  );
  return GenericReportsSchema.parse(response.data[0]);
};

export const getMarketAnalyticsPageDataReports = async ({
  filters,
}: GenericExportReportsPayload) => {
  const finalFilters = {
    report_type: "deal_market_analytics_report",
    ...filters,
  };

  const serializedQuery = querySerializer(finalFilters);
  const response = await privateAxios.post(
    `/reports/reports/${serializedQuery}`
  );
  return GenericReportsSchema.parse(response.data[0]);
};
