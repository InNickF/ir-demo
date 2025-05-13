import { isValueEmpty } from "@/commons/utils";
import { LegacyProperty } from "../typings/property";

export const getCoordinates = (
  properties: Array<LegacyProperty>,
  filter: {
    lender?: string | string[];
    region?: string | string[];
    status?: string | string[];
  }
) => {
  const coordinates = properties.filter((property) => {
    return (
      (!isValueEmpty(filter.lender) &&
        filter.lender.includes(property.lender_name)) ||
      (!isValueEmpty(filter.region) &&
        filter.region.includes(property.region)) ||
      (!isValueEmpty(filter.status) && filter.status.includes(property.status))
    );
  });

  const gav = coordinates.reduce((acc, property) => {
    return (
      acc +
      Math.abs(
        property.mortgage_payable_amortization_beginning_balance +
          property.mortgage_payable_amortization_beginning_balance +
          property.accrued_interest_beginning_balance +
          property.dpropertyvalue
      )
    );
  }, 0);

  return coordinates.map((property) => ({
    latitude: property.latitude ?? 25,
    longitude: property.longitude ?? -80,
    name: property.saddr2,
    lender: property.lender_name,
    region: property.region,
    status: property.status,
    id: property.property_code,
    gav,
    ...property,
  }));
};

const getMinValueOfArray = (values: number[]) => {
  return Math.min(...values);
};

const getMaxValueOfArray = (values: number[]) => {
  return Math.max(...values);
};

export const getBoundsOfArray = (data: LegacyProperty[]) => {
  const latitudes = data?.map((property) => property.latitude) || [];
  const longitudes = data?.map((property) => property.longitude) || [];
  const minLatitude = getMinValueOfArray(latitudes);
  const maxLatitude = getMaxValueOfArray(latitudes);
  const minLongitude = getMinValueOfArray(longitudes);
  const maxLongitude = getMaxValueOfArray(longitudes);
  return {
    minLatitude,
    maxLatitude,
    minLongitude,
    maxLongitude,
  };
};
