import { GenericLabelValueObject } from "@/commons/typings";
import {
  BasicDealInformation,
  ExtendedDealInformation,
} from "../typings/deals";

export const genericDealKeys: Array<keyof ExtendedDealInformation> = [
  "fund",
  "officer",
  "officer_status",
  "broker_company",
  "lender",
  "analyst",
  "law_firm_closing_probability",
  "law_firm",
  "phase",
  "status",
  "current_market_rent_sf_type",
  "type",
  "dead_reason_type",
];

export const genericFilterToValue = (
  filter: GenericLabelValueObject | string | number | boolean
) => {
  if (
    typeof filter === "string" ||
    typeof filter === "number" ||
    typeof filter === "boolean"
  ) {
    return filter;
  }
  return filter?.value;
};

export const transformDealToPayload = <T extends BasicDealInformation>(
  deal: T
) => {
  const payload: T = structuredClone(deal);

  Object.entries(deal).map(([key, value]) => {
    if (genericDealKeys.includes(key as keyof ExtendedDealInformation)) {
      payload[key] = genericFilterToValue(value);
    }
  });

  return payload as unknown;
};
