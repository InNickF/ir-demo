import { AssetLocationTenantByProperty } from "@/modules/assets/typings/asset-growth";

export const ASSET_LOCATION_BY_STATUS = [
  "new_tenant",
  "in_place",
  "vacant",
  "nan",
  "renewal",
  "existing",
];

export const ASSET_LOCATION_BY_MARKET = [
  "ny_nj",
  "mid_west",
  "south_florida",
  "seattle",
  "so_cal",
  "bay_area",
  "mid_atlantic",
];

export const ASSET_LOCATION_BY_INDUSTRY = [
  "radio",
  "cell_tower",
  "electronics",
  "transportation_logistics",
  "construction",
  "automotive",
  "mass_transit",
  "home_improvement",
  "parking",
  "consumer_retail_e_commerce",
  "nan",
  "self_storage",
  "vacant",
  "military_defense",
  "aviation",
  "medical_equipment_pharma",
];

export const getKeysFromArray = <T extends Record<string, unknown>>(
  object: T,
  array: Array<keyof T>
): Partial<T> => {
  const output: Partial<T> = {};
  for (const key of array) {
    if (key in object) {
      output[key] = object[key];
    }
  }
  return output as Partial<T>;
};

export const transformStringToMapLabel = (strings: string[]) => {
  const transformedStrings = strings.map((value) =>
    value
      .toLowerCase()
      .replaceAll(".", "")
      .replaceAll(/[^\w]/gi, "_")
      .replace(/(_)\1+/gim, "$1")
  );
  return transformedStrings;
};

export const getAssetLocationByFilter = (
  data: AssetLocationTenantByProperty,
  filter: string
) => {
  const filters = {
    status: ASSET_LOCATION_BY_STATUS,
    market: ASSET_LOCATION_BY_MARKET,
    industry: ASSET_LOCATION_BY_INDUSTRY,
  };
  const values = getKeysFromArray(data, filters[filter]);
  return values;
};

export const getAssetLocationKeys = (filter: string) => {
  const filters = {
    status: ASSET_LOCATION_BY_STATUS,
    market: ASSET_LOCATION_BY_MARKET,
    industry: ASSET_LOCATION_BY_INDUSTRY,
  };
  return filters[filter];
};
