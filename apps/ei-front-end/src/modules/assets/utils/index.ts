import { GenericLabelValueObject } from "@/commons/typings";
import {
  F12NOIsMetricsSchema,
  LeasedNOIsMetricsSchema,
  T12NOIsMetricsSchema,
} from "../schemas/NOIs";

export const AR_CHART_VALUE_LABELS = [
  "1. (0 - 30)",
  "2. (31 - 60)",
  "3. (61 - 90)",
  "4. (+ 90)",
  "5. (Prepay)",
] as const;

export const AR_TENANT_TYPES = ["active", "all"] as const;

export const PROPERTY_ATTACHMENT_TYPES = {
  PROPERTY_PICTURE: "PROPERTY_PICTURE",
} as const;

export const PROPERTY_TIMELINE_TYPES: GenericLabelValueObject[] = [
  {
    label: "Loan - Maturity",
    value: "loan_maturity",
  },
  {
    label: "Loan - Critical Date",
    value: "loan_critical_date",
  },
  {
    label: "Asset - Critical Date",
    value: "asset_critical_date",
  },
  {
    label: "Lease - Expiration",
    value: "lease_expiration",
  },
];

export const assetStrategyTypes = [
  "disposition",
  "leasing",
  "debt",
  "capex",
] as const;

export const LEASED_NOI_METRICS = Object.keys(
  LeasedNOIsMetricsSchema.shape
) as (keyof typeof LeasedNOIsMetricsSchema.shape)[];
export const T12_NOI_METRICS = Object.keys(T12NOIsMetricsSchema.shape) as (
  | keyof typeof T12NOIsMetricsSchema.shape
)[];
export const F12_NOI_METRICS = Object.keys(
  F12NOIsMetricsSchema.shape
) as (keyof typeof F12NOIsMetricsSchema.shape)[];
