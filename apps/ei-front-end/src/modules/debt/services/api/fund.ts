import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import {
  FundKpiSchema,
  FundOutstandingBalanceByLenderSchema,
  FundLenderByLtvSchema,
  FundMaturityLenderSchema,
} from "../../schemas/fund";
import { z } from "zod";

export const getFundKpis = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(`/debt/fund/kpi/${serializedQuery}`);

  return z.array(FundKpiSchema).parse(response.data);
};

export const getFundLenders = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-debt/loan-abstracts/charts/outstanding-balance-by-lenders/${serializedQuery}`
  );

  return z.array(FundOutstandingBalanceByLenderSchema).parse(response.data);
};

export const getFundMaturityLenders = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-debt/loan-summary/charts/maturity-schedule/${serializedQuery}`
  );

  return z.array(FundMaturityLenderSchema).parse(response.data);
};

export const getFundLendersByLtv = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-debt/loan-summary/charts/risk-refi/${serializedQuery}`
  );

  return z.array(FundLenderByLtvSchema).parse(response.data);
};

export const getFundOutstandingBalanceByLenders = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-debt/loan-summary/charts/outstanding-balance-by-lenders/${serializedQuery}`
  );

  return z.array(FundOutstandingBalanceByLenderSchema).parse(response.data);
};
