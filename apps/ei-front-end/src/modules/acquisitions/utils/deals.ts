import { GenericLabelValueObject } from "@/commons/typings";
import {
  SorterMap,
  SortValueKindObject,
} from "@/commons/model-in/formatters/sorters";
import {
  getDoDealAddressAlreadyExists,
  GetDoDealAddressAlreadyExistsParams,
} from "../services/api/deals";
import { Deal } from "../typings/deals";

export const validateIfDealAddressAlreadyExists = async ({
  address,
}: GetDoDealAddressAlreadyExistsParams): Promise<boolean> => {
  const deals = await getDoDealAddressAlreadyExists({
    address,
  });
  const dealAddressExist = deals?.results?.length > 0;
  return dealAddressExist;
};

const genericLabelValueSortGetter = ({
  deal,
  key,
}: {
  deal: Deal;
  key: keyof Deal;
}): SortValueKindObject => ({
  value: (deal?.[key] as GenericLabelValueObject)?.label || "",
  kind: "string",
});

export const dealSorters: SorterMap<Deal> = {
  market: "string",
  address: "string",
  submarket: "string",
  date_check_in: "date",
  latest_follow_up: "date",
  purchase_price: "number",
  sf: "number",
  psf: "number",
  latest_loi_submission: "date",
  broker_name: "string",
  officer_note: "string",
  landlord: "string",
  has_post_screening_data: "boolean",
  has_uw_model: "boolean",
  sorting: "number",
  status: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "status" }),
  analyst: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "analyst" }),
  officer: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "officer" }),
  fund: ({ item: deal }) => genericLabelValueSortGetter({ deal, key: "fund" }),
  phase: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "phase" }),
  dead_reason_type: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "dead_reason_type" }),
  type: ({ item: deal }) => genericLabelValueSortGetter({ deal, key: "type" }),
  officer_status: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "officer_status" }),
  current_market_rent_sf_type: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "current_market_rent_sf_type" }),
  broker_company: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "broker_company" }),
  lender: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "lender" }),
  law_firm: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "law_firm" }),
  law_firm_closing_probability: ({ item: deal }) =>
    genericLabelValueSortGetter({ deal, key: "law_firm_closing_probability" }),
};
