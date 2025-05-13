import {
  FundCommentsSchema,
  FundGavBySchema,
  FundIRRSchema,
  FundLeaseExpirationSchema,
  FundStrategySchema,
  FundTimelineSchema,
} from "@/assets/schemas/funds";
import { FundSchema } from "../../entities/fund/schemas";
import { fundGavGroupByOptions } from "@/assets/utils/funds";
import { PaginatedResponseSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";
import {
  FundComments,
  FundTimeline,
  FundStrategyPayload,
} from "../../typings/funds";

export type GetFundsFilters = GenericFilterPayload;

export const getFunds = async (filters: GetFundsFilters) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/portfolios/${serializedQuery}`
  );

  return z.array(FundSchema).parse(response?.data);
};

export interface GetFundFilters extends GenericFilterPayload {
  fund?: string;
}
export const getFund = async (filters: GetFundFilters) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/portfolios/metrics/${serializedQuery}`
  );

  return FundSchema.parse(response?.data);
};

export interface GetFundGavByFilters extends GenericFilterPayload {
  group_by: typeof fundGavGroupByOptions[number];
  fund: string;
}
export const getFundGavBy = async (filters: GetFundGavByFilters) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/portfolios/gav${serializedQuery}`
  );

  return z.array(FundGavBySchema).parse(response?.data);
};

export interface GetFundLeaseExpirationFilters extends GenericFilterPayload {
  fund: string;
}
export const getFundLeaseExpiration = async (
  filters: GetFundLeaseExpirationFilters
) => {
  const serializedQuery = querySerializer({
    ...filters,
    type: "lease-expiration",
  });
  const response = await privateAxios.get(
    `/data-asset/current-rent-rolls/charts${serializedQuery}`
  );
  return z.array(FundLeaseExpirationSchema).parse(response?.data);
};

export interface GetFundCommentsFilters extends GenericFilterPayload {
  fund_name: string;
}

export const getFundComments = async ({
  ...filters
}: GetFundCommentsFilters) => {
  const serializedQuery = querySerializer({ ...filters, page_size: "-1" });
  const response = await privateAxios.get(
    `/asset/fund-comments/${serializedQuery}`
  );
  const results = response?.data?.results;
  const lastItem = results[results.length - 1];

  return FundCommentsSchema.parse(
    lastItem || {
      id: null,
      fund_name: null,
      comment: null,
    }
  );
};

export interface GetFundStrategyFilters extends GenericFilterPayload {
  fund_name: string;
}

export const getFundStrategy = async ({
  ...filters
}: GetFundStrategyFilters) => {
  const serializedQuery = querySerializer({ ...filters });
  const response = await privateAxios.get(
    `/asset/fund-strategies/${serializedQuery}`
  );
  return PaginatedResponseSchema(FundStrategySchema).parse(response.data);
};

export interface GetFundTimelineFilters extends GenericFilterPayload {
  fund_name: string;
}

export const getFundTimeline = async ({
  ...filters
}: GetFundTimelineFilters) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/asset/fund-timelines/${serializedQuery}`
  );

  return PaginatedResponseSchema(FundTimelineSchema).parse(response?.data);
};

export const postFundStrategy = async ({ ...payload }: FundStrategyPayload) => {
  const response = await privateAxios.post(`/asset/fund-strategies/`, payload);

  return FundStrategySchema.parse(response.data);
};

export const postFundComments = async ({ ...payload }: FundComments) => {
  const response = await privateAxios.post(`/asset/fund-comments/`, payload);

  return FundCommentsSchema.parse(response.data);
};

export const postFundTimeline = async ({
  ...payload
}: Pick<FundTimeline, "comment" | "notable_date" | "fund_name">) => {
  const response = await privateAxios.post(`/asset/fund-timelines/`, payload);

  return response?.data as string;
};

export const deleteFundTimeline = async ({ ...payload }: FundTimeline) => {
  const response = await privateAxios.delete(
    `/asset/fund-timelines/${payload?.id}`
  );

  return response?.data as string;
};

export const patchFundTimeline = async ({ ...payload }: FundTimeline) => {
  const response = await privateAxios.patch(
    `/asset/fund-timelines/${payload.id}/`,
    payload
  );

  return response?.data as string;
};

export const getFundIRR = async (filters: GetFundFilters) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/fund-irr/${serializedQuery}&source=LIQ`
  );

  return FundIRRSchema.parse(response?.data);
};

export const getFundExitIRR = async (filters: GetFundFilters) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/fund-irr/${serializedQuery}&source=PROJ`
  );

  return FundIRRSchema.parse(response?.data);
};
