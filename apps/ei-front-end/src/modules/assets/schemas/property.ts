import { AttachmentsCommonKeysSchema } from "@/commons/schemas/files";
import { z } from "zod";
import { OperationalStatementTableMetricsType } from "../typings/property";
import { assetStrategyTypes, PROPERTY_ATTACHMENT_TYPES } from "../utils";
import { OPERATIONAL_FINANCIAL_PERFORMANCE_METRIC_TYPES } from "../utils/operational-financial-performance";

export const LegacyPropertySchema = z.object({
  fund: z.string().nullish(),
  property: z.string().nullish(),
  year_built: z.string().nullish(),
  property_type: z.string().nullish(),
  saddr1: z.string().nullish(),
  saddr2: z.string().nullish(),
  lender_name: z.string().nullish(),
  dtotalarea: z.number().nullish(),
  dpprice: z.number().nullish(),
  max_loan_commitment: z.number().nullish(),
  pricing: z.string().nullish(),
  term_yr: z.string().nullish(),
  mortgage_payable_beginning_balance: z.number().nullish(),
  mortgage_payable_amortization_beginning_balance: z.number().nullish(),
  accrued_interest_beginning_balance: z.number().nullish(),
  davailablearea: z.number().nullish(),
  actual_rate: z.number().nullish(),
  status: z.string().nullish(),
  fund_ownership: z.number().nullish(),
  execution_strategy: z.string().nullish(),
  dpropertyvalue: z.number().nullish(),
  maturity: z.string().nullish(),
  region: z.string().nullish(),
  sacquire: z.string().nullish(),
  amortization: z.string().nullish(),
  leased_noi: z.number().nullish(),
  property_code: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  capital_invested: z.number().nullish(),
  scity: z.string().nullish(),
  sstate: z.string().nullish(),
  dleasedarea: z.number().nullish(),
  sort_order: z.number().nullish(),
  rate_cap_vs_swap: z.string().nullish(),
  expiration_date_hedging: z.string().nullish(),
  strike_price: z.number().nullish(),
  floor: z.number().nullish(),
  percentage_debt: z.number().nullish(),
  ltv_current_balance: z.number().or(z.string()).nullish(),
});

export const PropertyDebtMetricsSchema = z.object({
  id: z.string().nullish(),
  loan_name: z.string().nullish(),
  lender_name: z.string().nullish(),
  loan_amount_max_commitment: z.number().nullish(),
  current_outstanding_loan_balance: z.number().nullish(),
  initial_maturity_date: z.string().nullish(),
  calculated_interest_rate: z.number().nullish(),
  spread: z.number().nullish(),
  index_name: z.string().nullish(),
  index_rate: z.number().nullish(),
  cap_strike: z.number().nullish(),
  updated_at: z.string().nullish(),
  contract_file: z.string().nullish(),
  yield_on_cost_over_last_12_months_noidm: z.number().nullish(),
  current_ltv: z.number().nullish(),
  amortization_type: z.string().nullish(),
  strike_price: z.number().nullish(),
  expiration_date: z.string().nullish(),
  rate_cap_vs_swap: z.string().nullish(),
  sorting: z.number().nullish(),
  noi_leased_noidm: z.number().nullish(),
  dscr_leased_noidm: z.number().nullish(),
  debt_yield_leased_noidm: z.number().nullish(),
  yield_on_cost_leased_noidm: z.number().nullish(),
});

export const PropertyImagesSchema = z.array(z.string());

export const PropertyProjectedExitMetricsSchema = z.object({
  yardi_code: z.string().nullish(),
  adjusted_noi_at_exit: z.number().nullish(),
  invested_equity_at_exit: z.number().nullish(),
  total_basis_at_exit: z.number().nullish(),
  projected_net_proceeds: z.number().nullish(),
  projected_sale_price: z.number().nullish(),
  sf: z.number().nullish(),
  property_address: z.string().nullish(),
  argus_name: z.string().nullish(),
  occupancy_at_exit: z.string().nullish(),
  walt_at_exit: z.string().nullish(),
  exit_cap_rate: z.string().nullish(),
  imputed_cap_rate: z.string().nullish(),
  buyers_3rd_year_adj_yoc: z.string().nullish(),
  profit: z.number().nullish(),
  moc: z.number().nullish(),
  irr: z.number().nullish(),
});

export const ARTenantDrillDownTableSchema = z.object({
  "0_30": z.number().nullish(),
  "31_60": z.number().nullish(),
  "61_90": z.number().nullish(),
  gt_90: z.number().nullish(),
  prepay: z.number().nullish(),
  charge_type: z.string().nullish(),
  charges: z.number().nullish(),
});

export const ARTenantDrillDownTotalsSchema = ARTenantDrillDownTableSchema.omit({
  charge_type: true,
});

export const ARTenantRowSchema = z.object({
  name: z.string().nullish(),
  yardi_entity_code: z.string().nullish(),
  property_name: z.string().nullish(),
  fund_name: z.string().nullish(),
  account_receivable: z.number().nullish(),
  charges_this_month: z.number().nullish(),
  months_outstanding: z.number().nullish(),
  drill_down: z.array(ARTenantDrillDownTableSchema).nullish(),
  totals: ARTenantDrillDownTotalsSchema.nullish(),
});

export const ARPropertyTableSchema = z
  .object({
    name: z.string().nullish(),
    totals: ARTenantRowSchema.pick({
      account_receivable: true,
      charges_this_month: true,
      months_outstanding: true,
    }),
    drill_down: z.array(ARTenantRowSchema).nullish(),
  })
  .nullish();

// Define the base schema without the drill_down field
export const BaseOperationalStatementTableMetricsSchema = z.object({
  metric: z.string().nullish(),
  actual: z.number().nullish(),
  reference: z.number().nullish(),
  variance: z.number().nullish(),
  variance_percentage: z.number().nullish(),
  account_comments: z.array(z.string().nullish()).nullish(),
  type: z.enum(OPERATIONAL_FINANCIAL_PERFORMANCE_METRIC_TYPES),
});

// Define the schema with the drill_down field, referencing itself recursively
export const OperationalStatementTableMetricsSchema: z.ZodSchema<OperationalStatementTableMetricsType> =
  BaseOperationalStatementTableMetricsSchema.extend({
    drill_down: z.lazy(() =>
      z.array(OperationalStatementTableMetricsSchema).nullish()
    ),
  });

// Define the OperationalStatementSchema as an array of the recursive schema
export const OperationalStatementSchema = z.array(
  OperationalStatementTableMetricsSchema
);

export const PropertyCommonKeysSchema = z.object({
  id: z.string().nullish(),
  property_name: z.string().nullish(),
  property_under_management_code: z.string().nullish(),
});

export const PropertyStrategySchema = PropertyCommonKeysSchema.extend({
  note: z.string().nullish(),
  type: z.enum(assetStrategyTypes).nullish(),
  created_by: z.number().nullish(),
});

export const PropertyCommentsSchema = PropertyCommonKeysSchema.extend({
  property_under_management_id: z.string().nullish(),
  comment: z.string().nullish(),
});

export const PropertyTimelineSchema = PropertyCommonKeysSchema.extend({
  comment: z.string().nullish(),
  notable_date: z.string().nullish(),
  type: z.string().nullish(),
});

export const PropertyAttachmentsSchema = z.intersection(
  AttachmentsCommonKeysSchema,
  PropertyCommonKeysSchema,
  z.object({
    type: z.string().nullish(),
  })
);

export const PropertyPhotoPayloadSchema = z.object({
  property_under_management_code: z.string(),
  name: z.string().nullish(),
  key: z.string().nullish(),
  type: z.literal(PROPERTY_ATTACHMENT_TYPES.PROPERTY_PICTURE).nullish(),
});

export const PropertyStrategyTypesSchema = z.enum(assetStrategyTypes);

export const PropertyStrategyPayloadSchema = z.object({
  property_under_management_code: z.string(),
  type: PropertyStrategyTypesSchema,
  note: z.string(),
});
