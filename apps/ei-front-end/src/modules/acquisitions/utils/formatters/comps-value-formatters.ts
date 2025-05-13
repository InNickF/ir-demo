import {
  Comp,
  CompstackLandComp,
  CompstackLandCompPayload,
  CompstackLeaseComp,
  CompstackLeaseCompPayload,
  CompstackSalesComp,
  CompstackSalesCompPayload,
  LandComp,
  LeaseComp,
  StabilizedProperty,
  TransitionalProperty,
} from "@/acquisitions/typings/market-analytics";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToDollar,
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import {
  CompTypeSchema,
  CompstackCompTypeSchema,
} from "../../schemas/market-analytics";

export type CommonCompValueFormatter = {
  [Key in keyof Comp]: (value: Comp[Key]) => string;
};

export type LeaseCompValueFormatter = {
  [Key in keyof LeaseComp]: (value: LeaseComp[Key]) => string;
};

export type TransitionalPropertyValueFormatter = {
  [Key in keyof TransitionalProperty]: (
    value: TransitionalProperty[Key]
  ) => string;
};

export type StabilizedPropertyValueFormatter = {
  [Key in keyof StabilizedProperty]: (value: StabilizedProperty[Key]) => string;
};

export type LandCompValueFormatter = {
  [Key in keyof LandComp]: (value: LandComp[Key]) => string;
};

export const commonCompValueFormatters: CommonCompValueFormatter = {
  address: (value) => genericGetValue(value),
  created: (value) => genericGetValue(value),
  id: (value) => genericGetValue(value),
  date: (value) => genericGetValue(value),
  latitude: (value) => genericGetValue(value),
  longitude: (value) => genericGetValue(value),
  modified: (value) => genericGetValue(value),
  notes: (value) => genericGetValue(value),
  submarket: (value) => genericGetValue(value),
  type: (value) => genericGetValue(value),
};

export const leaseCompValueFormatters: LeaseCompValueFormatter = {
  ...commonCompValueFormatters,
  recoveries: (value) => genericGetValue(value),
  tenant: (value) => genericGetValue(value),
  sf: (value) => readableNumber(value),
  rent_sf_month: (value) =>
    numberToDollar({
      value,
    }),
};

export const transitionalPropertyValueFormatters: TransitionalPropertyValueFormatter =
  {
    ...commonCompValueFormatters,
    price: (value) => numberToDollar({ value }),
    sf: (value) => readableNumber(value),
    price_sf: (value) => numberToDollar({ value }),
    cap_rate: (value) => numberToPercent(value),
    buyer: (value) => genericGetValue(value),
    seller: (value) => genericGetValue(value),
  };

export const stabilizedPropertyValueFormatters: StabilizedPropertyValueFormatter =
  {
    ...commonCompValueFormatters,
    price: (value) => numberToDollar({ value }),
    sf: (value) => readableNumber(value),
    price_sf: (value) => numberToDollar({ value }),
    cap_rate: (value) => numberToPercent(value),
    buyer: (value) => genericGetValue(value),
    seller: (value) => genericGetValue(value),
  };

export const landCompValueFormatters: LandCompValueFormatter = {
  ...commonCompValueFormatters,
  price: (value) => numberToDollar({ value }),
  acres: (value) => readableNumber(value),
  price_acre: (value) => numberToDollar({ value }),
  buildable_sf: (value) => readableNumber(value),
  price_buildable_sf: (value) => numberToDollar({ value }),
  buyer: (value) => genericGetValue(value),
  seller: (value) => genericGetValue(value),
};

export type AllCompValueFormatter = {
  [CompTypeSchema.Values.lease]: LeaseCompValueFormatter;
  [CompTypeSchema.Values
    .transitional_property]: TransitionalPropertyValueFormatter;
  [CompTypeSchema.Values.stabilized_property]: StabilizedPropertyValueFormatter;
  [CompTypeSchema.Values.land]: LandCompValueFormatter;
};

export const allCompsValueFormatters: AllCompValueFormatter = {
  [CompTypeSchema.Values.lease]: leaseCompValueFormatters,
  [CompTypeSchema.Values.transitional_property]:
    transitionalPropertyValueFormatters,
  [CompTypeSchema.Values.stabilized_property]:
    stabilizedPropertyValueFormatters,
  [CompTypeSchema.Values.land]: landCompValueFormatters,
};

export type CompstackLeaseCompValueFormatter = {
  [Key in keyof CompstackLeaseComp]: (value: CompstackLeaseComp[Key]) => string;
};

export type CompstackSalesCompValueFormatter = {
  [Key in keyof CompstackSalesComp]: (value: CompstackSalesComp[Key]) => string;
};

export type CompstackLandCompValueFormatter = {
  [Key in keyof CompstackLandComp]: (value: CompstackLandComp[Key]) => string;
};

export type allCompstackCompValueFormatter = {
  [CompstackCompTypeSchema.Values.lease]: CompstackLeaseCompValueFormatter;
  [CompstackCompTypeSchema.Values.sale]: CompstackSalesCompValueFormatter;
  [CompstackCompTypeSchema.Values.land]: CompstackLandCompValueFormatter;
};

export const compstackLeaseCompValueFormatters: CompstackLeaseCompValueFormatter =
  {
    amps: (value) => genericGetValue(value, true),
    volts: (value) => genericGetValue(value, true),
    annual_starting_rent: (value) => numberToDollar({ value }),
    break_option_dates: (value) => genericGetValue(value, true),
    building_floors: (value) => readableNumber(value),
    building_size: (value) => readableNumber(value),
    city: (value) => genericGetValue(value, true),
    clear_height: (value) => genericGetValue(value, true),
    commencement_date: (value) => genericGetValue(value, true),
    comments: (value) => genericGetValue(value, true),
    concessions_notes: (value) => genericGetValue(value, true),
    coverage_ratio: (value) => readableNumber(value),
    current_landlord: (value) => genericGetValue(value, true),
    doors: (value) => readableNumber(value),
    execution_date: (value) => genericGetValue(value, true),
    expiration_date: (value) => genericGetValue(value, true),
    free_rent_years: (value) => readableNumber(value),
    free_rent_months: (value) => readableNumber(value),
    landlord_brokerage_firms: (value) => genericGetValue(value, true),
    landlord_brokers: (value) => genericGetValue(value, true),
    lease_type: (value) => genericGetValue(value, true),
    latitude: (value) => genericGetValue(value, true),
    lease_comp_id: (value) => genericGetValue(value?.toString()),
    lease_term_months: (value) => readableNumber(value),
    lease_term_years: (value) => readableNumber(value),
    loading_docks: (value) => readableNumber(value),
    longitude: (value) => genericGetValue(value, true),
    lot_size: (value) => readableNumber(value),
    office_portion: (value) => readableNumber(value),
    parking_notes: (value) => genericGetValue(value, true),
    parking_ratio: (value) => genericGetValue(value, true),
    rail: (value) => genericGetValue(value, true),
    renewal_options: (value) => genericGetValue(value, true),
    rent_escalation: (value) => genericGetValue(value, true),
    rent_escalation_type: (value) => genericGetValue(value, true),
    sprinkler: (value) => genericGetValue(value, true),
    state: (value) => genericGetValue(value, true),
    street_address: (value) => genericGetValue(value, true),
    suite: (value) => genericGetValue(value, true),
    tenant_brokerage_firms: (value) => genericGetValue(value, true),
    tenant_brokers: (value) => genericGetValue(value, true),
    tenant_industry: (value) => genericGetValue(value, true),
    tenant_name: (value) => genericGetValue(value, true),
    tenant_websites: (value) => genericGetValue(value, true),
    transaction_sqft: (value) => readableNumber(value),
    transaction_type: (value) => genericGetValue(value, true),
    type: (value) => genericGetValue(value, true),
    updated_at: (value) => genericGetValue(value, true),
    work_value: (value) => readableNumber(value),
    year_built: (value) => genericGetValue(value?.toString()),
    year_renovated: (value) => genericGetValue(value?.toString()),
    zip_code: (value) => genericGetValue(value, true),
    monthly_rent: (value) => numberToDollar({ value }),
  };

export const compstackSalesAndLandCompValueFormatters: CompstackSalesCompValueFormatter =
  {
    in_place_cap_rate: (value) => numberToPercent(value),
    age: (value) => readableNumber(value),
    amenities: (value) => genericGetValue(value, true),
    asking_price: (value) => numberToDollar({ value }),
    building_condition: (value) => genericGetValue(value, true),
    building_operating_expenses: (value) => genericGetValue(value, true),
    building_tax_expenses: (value) => genericGetValue(value, true),
    buyer_contact: (value) => genericGetValue(value, true),
    buyer_true_company: (value) => genericGetValue(value, true),
    buyer_true_contact: (value) => genericGetValue(value, true),
    buyer_true_origin: (value) => genericGetValue(value, true),
    buyers_broker_agent_first_name: (value) => genericGetValue(value, true),
    buyers_broker_agent_last_name: (value) => genericGetValue(value, true),
    buyers_broker_company: (value) => genericGetValue(value, true),
    comp_sk: (value) => genericGetValue(value, true),
    down_payment: (value) => numberToDollar({ value }),
    hold_period_months: (value) => readableNumber(value),
    hold_period_years: (value) => readableNumber(value),
    latitude: (value) => genericGetValue(value, true),
    listing_broker_agent_first_name: (value) => genericGetValue(value, true),
    listing_broker_agent_last_name: (value) => genericGetValue(value, true),
    listing_broker_company: (value) => genericGetValue(value, true),
    location_type: (value) => genericGetValue(value, true),
    longitude: (value) => genericGetValue(value, true),
    market_time: (value) => genericGetValue(value?.toString()),
    multi_sale_name: (value) => genericGetValue(value, true),
    net_income: (value) => numberToDollar({ value }),
    non_arms_length_reasons: (value) => genericGetValue(value, true),
    number_of_floors: (value) => readableNumber(value),
    percent_leased: (value) => numberToPercent(value),
    portfolio_name: (value) => genericGetValue(value, true),
    price_per_ac_land: (value) => numberToDollar({ value }),
    price_per_sf: (value) => numberToDollar({ value }),
    price_per_sf_land: (value) => numberToDollar({ value }),
    price_per_sf_net: (value) => numberToDollar({ value }),
    imputed_cap_rate: (value) => numberToPercent(value),
    street_address: (value) => genericGetValue(value, true),
    city: (value) => genericGetValue(value, true),
    state: (value) => genericGetValue(value, true),
    zip_code: (value) => genericGetValue(value, true),
    property_id: (value) => genericGetValue(value, true),
    recording_date: (value) => genericGetValue(value, true),
    sale_condition: (value) => genericGetValue(value, true),
    sale_price: (value) => numberToDollar({ value }),
    sale_price_comment: (value) => genericGetValue(value, true),
    sale_status: (value) => genericGetValue(value, true),
    sales_date: (value) => genericGetValue(value, true),
    secondary_type: (value) => genericGetValue(value, true),
    seller_company: (value) => genericGetValue(value, true),
    seller_contact: (value) => genericGetValue(value, true),
    seller_true_company: (value) => genericGetValue(value, true),
    seller_true_contact: (value) => genericGetValue(value, true),
    id: (value) => genericGetValue(value, true),
    seller_true_origin: (value) => genericGetValue(value, true),
    size: (value) => readableNumber(value),
    star_rating: (value) => genericGetValue(value, true),
    total_expense_amount: (value) => numberToDollar({ value }),
    transaction_notes: (value) => genericGetValue(value, true),
    type: (value) => genericGetValue(value, true),
    typical_floor_sf: (value) => readableNumber(value),
    is_part_of_multi_property: (value) =>
      genericGetValue(value?.toString(), true),
    is_part_of_portfolio: (value) => genericGetValue(value?.toString(), true),
  };

export const compstackLandCompValueFormatters: CompstackLandCompValueFormatter =
  {
    ...compstackSalesAndLandCompValueFormatters,
    type: (value) => genericGetValue(value, true),
  };

export const compstackSalesCompValueFormatters: CompstackSalesCompValueFormatter =
  {
    ...compstackSalesAndLandCompValueFormatters,
    type: (value) => genericGetValue(value, true),
    year_built: (value) => genericGetValue(value?.toString()),
  };

export const allCompstackCompValueFormatters: allCompstackCompValueFormatter = {
  [CompstackCompTypeSchema.Values.lease]: compstackLeaseCompValueFormatters,
  [CompstackCompTypeSchema.Values.sale]: compstackSalesCompValueFormatters,
  [CompstackCompTypeSchema.Values.land]: compstackLandCompValueFormatters,
};

export type CompstackLeaseCompKeysOrder = Array<keyof CompstackLeaseComp>;
export const compstackLeaseCompKeysOrder: CompstackLeaseCompKeysOrder = [
  "execution_date",
  "street_address",
  "transaction_sqft",
  "annual_starting_rent",
  "year_built",
  "building_size",
  "commencement_date",
  "year_renovated",
  "transaction_type",
  "city",
  "state",
  "zip_code",
  "current_landlord",
  "lease_term_months",
  "lease_term_years",
  "expiration_date",
  "free_rent_months",
  "free_rent_years",
  "lease_type",
  "rent_escalation_type",
  "rent_escalation",
  "tenant_name",
  "landlord_brokers",
  "landlord_brokerage_firms",
  "tenant_brokers",
  "tenant_brokerage_firms",
  "loading_docks",
  "doors",
  "rail",
  "clear_height",
  "parking_notes",
  "parking_ratio",
  "office_portion",
  "tenant_industry",
  "work_value",
  "renewal_options",
  "break_option_dates",
  "suite",
  "sprinkler",
  "amps",
  "volts",
  "building_floors",
  "lot_size",
  "coverage_ratio",
  "tenant_websites",
  "concessions_notes",
  "type",
  "comments",
  "updated_at",
  "latitude",
  "lease_comp_id",
  "longitude",
];

export type CompstackSaleCompKeysOrder = Array<keyof CompstackSalesComp>;
export const compstackSaleCompKeysOrder: CompstackSaleCompKeysOrder = [
  "street_address",
  "sale_price",
  "size",
  "sales_date",
  "price_per_sf",
  "year_built",
  "sale_price_comment",
  "recording_date",
  "sale_status",
  "price_per_sf_net",
  "price_per_sf_land",
  "star_rating",
  "secondary_type",
  "percent_leased",
  "building_condition",
  "transaction_notes",
  "non_arms_length_reasons",
  "sale_condition",
  "in_place_cap_rate",
  "imputed_cap_rate",
  "buyer_true_origin",
  "buyer_contact",
  "buyer_true_company",
  "buyer_true_contact",
  "buyers_broker_agent_first_name",
  "buyers_broker_agent_last_name",
  "buyers_broker_company",
  "seller_company",
  "seller_true_origin",
  "seller_contact",
  "seller_true_contact",
  "seller_true_company",
  "listing_broker_agent_first_name",
  "listing_broker_agent_last_name",
  "listing_broker_company",
  "amenities",
  "asking_price",
  "market_time",
  "down_payment",
  "net_income",
  "total_expense_amount",
  "building_operating_expenses",
  "building_tax_expenses",
  "portfolio_name",
  "multi_sale_name",
  "location_type",
  "age",
  "typical_floor_sf",
  "number_of_floors",
  "type",
  "latitude",
  "longitude",
  "comp_sk",
  "property_id",
];

export type CompstackLandCompKeysOrder = Array<keyof CompstackLandComp>;
export const compstackLandCompKeysOrder: CompstackLandCompKeysOrder = [
  "street_address",
  "sale_price",
  "size",
  "sales_date",
  "price_per_sf",
  "sale_price_comment",
  "recording_date",
  "sale_status",
  "price_per_sf_net",
  "star_rating",
  "secondary_type",
  "percent_leased",
  "building_condition",
  "transaction_notes",
  "non_arms_length_reasons",
  "sale_condition",
  "in_place_cap_rate",
  "imputed_cap_rate",
  "buyer_true_origin",
  "buyer_contact",
  "buyer_true_company",
  "buyer_true_contact",
  "buyers_broker_agent_first_name",
  "buyers_broker_agent_last_name",
  "buyers_broker_company",
  "seller_company",
  "seller_true_origin",
  "seller_contact",
  "seller_true_contact",
  "seller_true_company",
  "listing_broker_agent_first_name",
  "listing_broker_agent_last_name",
  "listing_broker_company",
  "amenities",
  "asking_price",
  "market_time",
  "down_payment",
  "net_income",
  "total_expense_amount",
  "building_operating_expenses",
  "building_tax_expenses",
  "portfolio_name",
  "multi_sale_name",
  "location_type",
  "age",
  "is_part_of_multi_property",
  "is_part_of_portfolio",
  "typical_floor_sf",
  "number_of_floors",
  "type",
  "latitude",
  "longitude",
  "comp_sk",
  "property_id",
];

export type CompstackCompKeysOrder =
  | CompstackLeaseCompKeysOrder
  | CompstackSaleCompKeysOrder
  | CompstackLandCompKeysOrder;

export const leaseCompstackManualCompsBriefForm: Array<
  keyof CompstackLeaseCompPayload
> = [
  "commencement_date",
  "street_address",
  "city",
  "state",
  "zip_code",
  "building_size",
  "rent_escalation_type",
  "rent_escalation",
  "execution_date",
  "free_rent_months",
  "free_rent_years",
  "free_rent" as keyof CompstackLeaseComp,
  "tenant_name",
  "current_landlord",
  "clear_height",
  "doors",
  "tenant_brokerage_firms",
  "landlord_brokerage_firms",
  "comments",
];

export const leaseCompstackManualCompsFormCategories: Record<
  string,
  Array<keyof CompstackLeaseCompPayload>
> = {
  "Lease information": [
    "execution_date",
    "transaction_sqft",
    "commencement_date",
    "year_renovated",
    "transaction_type",
    "concessions_notes",
    "current_landlord",
    "lease_term_years",
    "lease_term_months",
    "lease_term" as keyof CompstackLeaseCompPayload,
    "expiration_date",
    "lease_type",
    "renewal_options",
    "break_option_dates",
    "comments",
  ],
  "Building Information": [
    "street_address",
    "year_built",
    "building_size",
    "city",
    "state",
    "zip_code",
    "loading_docks",
    "doors",
    "rail",
    "clear_height",
    "parking_notes",
    "parking_ratio",
    "office_portion",
    "suite",
    "sprinkler",
    "amps",
    "volts",
    "building_floors",
    "lot_size",
    "coverage_ratio",
    "tenant_websites",
  ],
  "Rent Information": [
    "annual_starting_rent",
    "rent_escalation",
    "free_rent_years",
    "free_rent_months",
    "free_rent" as keyof CompstackLeaseCompPayload,
    "rent_escalation_type",
    "tenant_name",
    "tenant_industry",
    "work_value",
    "tenant_websites",
  ],
  "Brokers Information": [
    "landlord_brokers",
    "landlord_brokerage_firms",
    "tenant_brokers",
    "tenant_brokerage_firms",
  ],
};

export const saleCompstackManualCompsBriefForm: Array<
  keyof CompstackSalesCompPayload
> = [
  "sales_date",
  "street_address",
  "sale_price",
  "size",
  "price_per_sf",
  "in_place_cap_rate",
  "transaction_notes",
];

export const saleCompstackManualCompsFormCategories: Record<
  string,
  Array<keyof CompstackSalesCompPayload>
> = {
  "Property information": [
    "street_address",
    "city",
    "state",
    "zip_code",
    "size",
    "percent_leased",
    "year_built",
  ],
  "Transaction Information": [
    "sales_date",
    "sale_price",
    "price_per_sf",
    "sale_price_comment",
    "recording_date",
    "price_per_sf_net",
    "sale_condition",
    "in_place_cap_rate",
    "imputed_cap_rate",
    "asking_price",
    "down_payment",
    "transaction_notes",
  ],
  "Property Financial": [
    "net_income",
    "total_expense_amount",
    "portfolio_name",
    "building_operating_expenses",
    "building_tax_expenses",
    "is_part_of_multi_property",
    "is_part_of_portfolio",
  ],
  "Buyer Information": [
    "buyer_true_origin",
    "buyer_contact",
    "buyer_true_company",
    "buyer_true_contact",
    "buyers_broker_company",
    "buyers_broker_agent_first_name",
    "buyers_broker_agent_last_name",
  ],
  "Seller Information": [
    "seller_company",
    "seller_true_origin",
    "seller_contact",
    "seller_true_contact",
    "seller_true_company",
    "listing_broker_company",
    "listing_broker_agent_first_name",
    "listing_broker_agent_last_name",
  ],
};

export const landCompstackManualCompsBriefForm: Array<
  keyof CompstackLandCompPayload
> = ["sales_date", "street_address", "sale_price", "transaction_notes"];

export const landCompstackManualCompsFormCategories: Record<
  string,
  Array<keyof CompstackLandCompPayload>
> = {
  "Property information": [
    "street_address",
    "city",
    "state",
    "zip_code",
    "size",
    "percent_leased",
  ],
  "Transaction Information": [
    "sales_date",
    "sale_price",
    "price_per_sf",
    "sale_price_comment",
    "recording_date",
    "price_per_sf_net",
    "sale_condition",
    "in_place_cap_rate",
    "imputed_cap_rate",
    "asking_price",
    "down_payment",
    "transaction_notes",
  ],
  "Property Financial": [
    "net_income",
    "total_expense_amount",
    "portfolio_name",
    "building_operating_expenses",
    "building_tax_expenses",
    "is_part_of_multi_property",
    "is_part_of_portfolio",
  ],
  "Buyer Information": [
    "buyer_true_origin",
    "buyer_contact",
    "buyer_true_company",
    "buyer_true_contact",
    "buyers_broker_company",
    "buyers_broker_agent_first_name",
    "buyers_broker_agent_last_name",
  ],
  "Seller Information": [
    "seller_company",
    "seller_true_origin",
    "seller_contact",
    "seller_true_contact",
    "seller_true_company",
    "listing_broker_company",
    "listing_broker_agent_first_name",
    "listing_broker_agent_last_name",
  ],
};
