import { privateAxios } from "@/commons/services/clients";
import { GenericFilterPayload } from "@/commons/typings";
import { querySerializer } from "@/commons/utils/query-serializer";
import { z } from "zod";
import {
  AssetLocationPointSchema,
  GeographicConcentrationSchema,
  ProjectedNoiGrowthSchema,
} from "../../schemas/portfolio-growth";

export const getProjectedNoiGrowth = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/data-asset/projected-net-operating-incomes/charts${serializedQuery}`
  );

  return z.array(ProjectedNoiGrowthSchema).parse(response.data);
};

export const getGeographicConcentration = async (
  filters: GenericFilterPayload
) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/asset/tenant/geographic-concentration/${serializedQuery}`
  );

  return z.array(GeographicConcentrationSchema).parse(response.data);
};

export const getAssetLocation = async (filters: GenericFilterPayload) => {
  const serializedQuery = querySerializer(filters);
  const response = await privateAxios.get(
    `/asset/portfolio-growth/properties/${serializedQuery}`
  );

  return z.array(AssetLocationPointSchema).parse(response.data);
};
