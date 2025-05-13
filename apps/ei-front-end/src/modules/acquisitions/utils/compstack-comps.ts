import { getYearFromMMDDYYYY } from "@/commons/utils/dates";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";
import { GetCompstackCompsFiltersBase } from "../services/api/market-analytics";
import {
  CompstackComp,
  CompstackCompKeysArrayByType,
  CompstackCompKeysPayloadArrayByType,
  CompstackCompType,
  CompstackLandComp,
  CompstackLeaseComp,
  CompstackSalesComp,
} from "../typings/market-analytics";
import {
  compstackLandCompKeysOrder,
  compstackLeaseCompKeysOrder,
  compstackSaleCompKeysOrder,
  landCompstackManualCompsBriefForm,
  landCompstackManualCompsFormCategories,
  leaseCompstackManualCompsBriefForm,
  leaseCompstackManualCompsFormCategories,
  saleCompstackManualCompsBriefForm,
  saleCompstackManualCompsFormCategories,
} from "./formatters/comps-value-formatters";

export const getCompstackCompId = (comp: CompstackComp) => {
  if (comp?.type === "lease") {
    return comp.lease_comp_id;
  }
  if (comp?.type === "sale") {
    return comp.id;
  }
  if (comp?.type === "land") {
    return comp.id;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (comp as any)?.comp_id as string;
};

export const getCompstackCompAddress = (comp: CompstackComp) => {
  const state = comp?.state ? `${comp.state}, ` : "";
  const city = comp?.city ? `${comp.city}, ` : "";
  const streetAddress = comp?.street_address ? `${comp.street_address}, ` : "";
  const zipCode = comp?.zip_code ? `${comp.zip_code}` : "";

  const address = `${state}${city}${streetAddress}${zipCode}.`;
  return address;
};

type CompstackCompKeysToIgnore = CompstackCompKeysArrayByType;
export const getCompstackCompKeysToIgnore = <T extends CompstackCompType>({
  compType,
  ignoreAddressKeys = false,
}: {
  compType: T;
  ignoreAddressKeys?: boolean;
}): CompstackCompKeysToIgnore[T] => {
  switch (compType) {
    case "lease": {
      const leaseKeys = [
        "lease_comp_id",
        "longitude",
        "latitude",
        "updated_at",
      ] as Array<keyof CompstackLeaseComp>;
      ignoreAddressKeys &&
        leaseKeys.push("street_address", "state", "city", "zip_code");
      return leaseKeys as CompstackCompKeysToIgnore[T];
    }
    case "sale": {
      const saleKeys = [
        "comp_id",
        "latitude",
        "longitude",
        "property_id",
        "id",
      ] as Array<keyof CompstackSalesComp>;

      ignoreAddressKeys && saleKeys.push("street_address");
      return saleKeys as CompstackCompKeysToIgnore[T];
    }
    case "land": {
      const landKeys = [
        "comp_id",
        "latitude",
        "longitude",
        "property_id",
        "id",
      ] as Array<keyof CompstackLandComp>;
      ignoreAddressKeys && landKeys.push("street_address");
      return landKeys as CompstackCompKeysToIgnore[T];
    }
    default: {
      return ["longitude", "latitude"] as Array<keyof CompstackComp>;
    }
  }
};

export const getFullGridSizeCompstackCompKeys = <T extends CompstackCompType>({
  compType,
}: {
  compType: T;
}): CompstackCompKeysArrayByType[T] => {
  const keysMap: CompstackCompKeysArrayByType = {
    lease: ["comments"],
    sale: ["transaction_notes"],
    land: ["transaction_notes"],
  };

  return keysMap[compType];
};

export function getCompKeysOrder<T extends CompstackCompType>(
  compType: T
): CompstackCompKeysArrayByType[T] {
  const keysMap: CompstackCompKeysArrayByType = {
    lease: compstackLeaseCompKeysOrder,
    sale: compstackSaleCompKeysOrder,
    land: compstackLandCompKeysOrder,
  };

  return keysMap[compType];
}

export const formatCompstackCompAgeFilters = <
  T extends GetCompstackCompsFiltersBase
>(
  filters: T
) => {
  const baseFilters = objectWithSomeValueOrNull(filters);
  return baseFilters?.age
    ? {
        ...baseFilters,
        age: {
          from_age:
            getYearFromMMDDYYYY(baseFilters?.age?.from_age as string) || "",
          to_age: getYearFromMMDDYYYY(baseFilters?.age?.to_age as string) || "",
        },
      }
    : baseFilters;
};

export const getCompstackManualCompsBriefForm = <T extends CompstackCompType>(
  compType: T
): CompstackCompKeysPayloadArrayByType[T] => {
  const keysMap: CompstackCompKeysPayloadArrayByType = {
    lease: leaseCompstackManualCompsBriefForm,
    sale: saleCompstackManualCompsBriefForm,
    land: landCompstackManualCompsBriefForm,
  };

  return keysMap[compType];
};

export const getCompstackManualCompsFullForm = <T extends CompstackCompType>(
  compType: T
): Record<string, CompstackCompKeysPayloadArrayByType[T]> | null => {
  const keysMap = {
    lease: leaseCompstackManualCompsFormCategories,
    sale: saleCompstackManualCompsFormCategories,
    land: landCompstackManualCompsFormCategories,
  };

  return keysMap[compType] as Record<
    string,
    CompstackCompKeysPayloadArrayByType[T]
  >;
};
