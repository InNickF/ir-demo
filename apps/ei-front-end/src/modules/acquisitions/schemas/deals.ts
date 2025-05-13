import { GenericAddressLatLongSchema } from "@/commons/schemas/addresses";
import { GenericLabelValueObjectSchema } from "@/commons/schemas/filters";
import { GenericTableRowColsSchema } from "@/commons/schemas/tables";
import { number, z } from "zod";
import {
  CRITICAL_DATES_TABLE_ACTIVITIES,
  DEAL_DEAD_REASON_TYPES,
  DEAL_FILE_TYPES,
  DEAL_FILE_TYPES_KEYS,
  DEAL_LAW_CLOSING_PROBABILITIES,
  DEAL_OFFICER_STATUS,
  DEAL_PHASES,
  DEAL_STATUSES,
  DEAL_TIMELINE_KEYS,
  DEAL_VALUE_ADD_TYPES,
  MARKET_RENT_TYPES,
  YEAR_MONTHS,
} from "../utils";
import { CompSharedInformationSchema } from "./market-analytics";
import { AttachmentsCommonKeysSchema } from "@/commons/schemas/files";

export const DealPhaseSchema = z.enum(DEAL_PHASES);
export const DealStatusSchema = z.enum(DEAL_STATUSES);
export const DealLawClosingProbabilitySchema = z.enum(
  DEAL_LAW_CLOSING_PROBABILITIES
);
export const DealValueAddTypeSchema = z.enum(DEAL_VALUE_ADD_TYPES);
export const DealDeadReasonTypeSchema = z.enum(DEAL_DEAD_REASON_TYPES);
export const MarketRentTypeSchema = z.enum(MARKET_RENT_TYPES);
export const DealOfficerStatusSchema = z.enum(DEAL_OFFICER_STATUS);

export const DealPhaseObjectSchema = z.object({
  phase: GenericLabelValueObjectSchema(DealPhaseSchema).nullish(),
});

export const DealStatusObjectSchema = z.object({
  status: GenericLabelValueObjectSchema(DealStatusSchema).nullish(),
});

export const DealLawClosingProbabilityObjectSchema = z.object({
  law_firm_closing_probability: GenericLabelValueObjectSchema(
    DealLawClosingProbabilitySchema
  ).nullish(),
});

export const DealCommonEditableAttributesSchema = z
  .object({})
  .merge(DealPhaseObjectSchema)
  .merge(DealStatusObjectSchema)
  .merge(DealLawClosingProbabilityObjectSchema);

export const DealPhaseObjectPayloadSchema = z.object({
  phase: DealPhaseSchema.nullish(),
});

export const DealStatusObjectPayloadSchema = z.object({
  status: DealStatusSchema.nullish(),
});

export const DealLawClosingProbabilityObjectPayloadSchema = z.object({
  law_firm_closing_probability: DealLawClosingProbabilitySchema.nullish(),
});

export const DealCommonEditableAttributesPayloadSchema = z
  .object({})
  .merge(DealPhaseObjectPayloadSchema)
  .merge(DealStatusObjectPayloadSchema)
  .merge(DealLawClosingProbabilityObjectPayloadSchema);

export const DealHasPostScreeningDataSchema = z.object({
  has_post_screening_data: z.boolean().nullish(),
});

export const DealHasUWModelSchema = z.object({
  has_uw_model: z.boolean().nullish(),
});

export const DealHasPostScreeningTimeline = z.object({
  has_post_screening_timeline: z.boolean().nullish(),
});

export const BasicDealInformationSchema = z
  .object({
    id: z.string().nullish(),
    name: z.string().nullish(),
    purchase_price: z.number().nullish(),
    psf: z.number().nullish(),
    submarket: z.string(),
    market: z.string(),
    sf: z.number().nullish(),
    officer: GenericLabelValueObjectSchema().nullish(),
    analyst: GenericLabelValueObjectSchema().nullish(),
    fund: GenericLabelValueObjectSchema().nullish(),
    fund_name: z.string().nullish(),
    strategy: z.string().nullish(),
    comments: z.string().nullish(),
    seller: z.string().nullish(),
    created: z.string().nullish(),
    modified: z.string().nullish(),
    created_by: z.string().nullish(),
    modified_by: z.string().nullish(),
    origination: z.string().nullish(),
    dead_reason: z.string().nullish(),
    dead_reason_type: GenericLabelValueObjectSchema(
      DealDeadReasonTypeSchema
    ).nullish(),
    type: GenericLabelValueObjectSchema(DealValueAddTypeSchema).nullish(),
    sorting: z.number().nullish(),
    date_deal_submission: z.string().nullish(),
    latest_follow_up: z.string().nullish(),
    date_check_in: z.string().nullish(),
    latest_loi_submission: z.string().nullish(),
    officer_note: z.string().nullish(),
    officer_status: GenericLabelValueObjectSchema(
      DealOfficerStatusSchema
    ).nullish(),
    landlord: z.string().nullish(),
    pricing_guidance: number().nullish(),
    occupancy_at_acquisitions: z.number().nullish(),
  })
  .merge(DealPhaseObjectSchema)
  .merge(GenericAddressLatLongSchema)
  .merge(DealHasPostScreeningDataSchema)
  .merge(DealHasUWModelSchema)
  .merge(DealHasPostScreeningTimeline);

export const DealBackOfTheNapkinInformationSchema = z.object({
  transaction_costs_percentage: z.number().nullish(),
  transaction_costs: z.number().nullish(),
  transaction_costs_psf: z.number().nullish(),
  tenant_improvements_psf: z.number().nullish(),
  tenant_improvements: z.number().nullish(),
  leasing_commissions_psf: z.number().nullish(),
  leasing_commissions: z.number().nullish(),
  capital_expenditures_psf: z.number().nullish(),
  capital_expenditures: z.number().nullish(),
  total_uses: z.number().nullish(),
  total_uses_psf: z.number().nullish(),
  debt_percentage: z.number().nullish(),
  debt: z.number().nullish(),
  debt_psf: z.number().nullish(),
  equity_percentage: z.number().nullish(),
  equity: z.number().nullish(),
  equity_psf: z.number().nullish(),
  total_sources: z.number().nullish(),
  total_sources_psf: z.number().nullish(),
  current_market_rent_sf: z.number().nullish(),
  current_market_rent_sf_type: GenericLabelValueObjectSchema().nullish(),
  imputed_yield_on_cost_percentage: z.number().nullish(),
  cap_rate: z.number().nullish(),
});

export const DealSpecsInformationSchema = z.object({
  year_built: z.number().nullish(),
  number_of_buildings: z.number().nullish(),
  number_of_units: z.number().nullish(),
  site_area: z.number().nullish(),
  site_coverage: z.number().nullish(),
  clear_heights: z.string().nullish(),
  dock_high_doors: z.number().nullish(),
});

export const DealUnderwritingModelSchema = z.object({
  file: typeof window === "undefined" ? z.any() : z.instanceof(File),
});

export const ScreeningDealInformationSchema = z
  .object({})
  .merge(BasicDealInformationSchema)
  .merge(DealBackOfTheNapkinInformationSchema)
  .merge(DealSpecsInformationSchema);

export const ScreeningDealInformationPayloadSchema =
  ScreeningDealInformationSchema.extend({
    officer: z.string().nullish(),
    analyst: z.string().nullish(),
    fund: z.string().nullish(),
    law_firm: z.string().nullish(),
    market: z.string().nullish(),
    dead_reason_type: z.string().nullish(),
    current_market_rent_sf_type: z.string().nullish(),
    phase: DealPhaseSchema.nullish(),
  }).merge(DealCommonEditableAttributesPayloadSchema);

export const DealAttachmentSchema = AttachmentsCommonKeysSchema.extend({
  type: z.enum(DEAL_FILE_TYPES_KEYS),
  deal: z.string().nullish(),
});

const ExtendedBaseDealInformationSchema = z.object({
  yardi_code: z.string().nullish(),
  broker_company: GenericLabelValueObjectSchema().nullish(),
  broker_name: z.string().nullish(),
  lender: GenericLabelValueObjectSchema().nullish(),
  law_firm: GenericLabelValueObjectSchema().nullish(),
  extension_option: z.string().nullish(),
  deal_attachments: z.array(DealAttachmentSchema).nullish(),
});

export const ExtendedDealInformationSchema =
  ExtendedBaseDealInformationSchema.merge(
    DealCommonEditableAttributesSchema
  ).merge(ScreeningDealInformationSchema);

export const ExtendedDealInformationPayloadSchema =
  ExtendedBaseDealInformationSchema.extend({
    officer: z.string().nullish(),
    analyst: z.string().nullish(),
    fund: z.string().nullish(),
    law_firm: z.string().nullish(),
    market: z.string().nullish(),
    broker_company: z.string().nullish(),
    lender: z.string().nullish(),
  })
    .merge(DealCommonEditableAttributesPayloadSchema.required())
    .merge(ScreeningDealInformationPayloadSchema);

export const DealFilesSchema = z.object({
  underwriting_model:
    typeof window === "undefined" ? z.any() : z.instanceof(File),
  wire_instructions:
    typeof window === "undefined" ? z.any() : z.instanceof(File),
});

export const DealTimelineKeysSchema = z.enum(DEAL_TIMELINE_KEYS);

export const DealTimelineItemValuesSchema = z.object({
  id: z.string().nullish(),
  deadline: z.string().nullish(),
  amount: z.number().nullish(),
  days: z.number().nullish(),
});

const DealTimelineItems = DEAL_TIMELINE_KEYS.map(
  (key: typeof DEAL_TIMELINE_KEYS[number]) => ({
    [key]: DealTimelineItemValuesSchema,
  })
).reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<
  typeof DEAL_TIMELINE_KEYS[number],
  typeof DealTimelineItemValuesSchema
>;

export const DealFormTimelineItemSchema = z.object(DealTimelineItems);

export const DealTimelineItemTypeObjectSchema = z.object({
  id: DealTimelineKeysSchema,
  name: z.string().nullish(),
});

export const DealTimelineItemSchema = z
  .object({
    type: DealTimelineItemTypeObjectSchema,
  })
  .merge(DealTimelineItemValuesSchema);

export const DealTimelineItemPayloadSchema = DealTimelineItemSchema.extend({
  type: DealTimelineKeysSchema,
  deal: z.string(),
});

export const ExtendedDealInformationWithFilesAndTimelineSchema = z
  .object({
    timeline: DealFormTimelineItemSchema,
  })
  .merge(ExtendedDealInformationSchema)
  .merge(DealFilesSchema);

export const DealUnderwritingAssumptionsSchema = z.object({
  trending_rents: z.number().nullish(),
  term_length: z.number().nullish(),
  renewal_probability: z.number().nullish(),
  months_vacant: z.number().nullish(),
  current_market_rent_sf: z.number().nullish(),
  current_market_rent_sf_type: GenericLabelValueObjectSchema().nullish(),
  rent_steps: z.number().nullish(),
  new_free_rent: z.number().nullish(),
  renew_free_rent: z.number().nullish(),
  recovery_type: z.string().nullish(),
  tenant_improvements_new: z.number().nullish(),
  tenant_improvements_renew: z.number().nullish(),
  leasing_commissions_new: z.number().nullish(),
  leasing_commissions_renew: z.number().nullish(),
});

export const DealLoanAssumptionsSchema = z.object({
  debt: z.number().nullish(),
  future_funding: z.number().nullish(),
  total_debt: z.number().nullish(),
  ltv: z.number().nullish(),
  ltc: z.number().nullish(),
  going_in_yield: z.number().nullish(),
  going_in_debt_yield: z.number().nullish(),
  going_in_dscr: z.number().nullish(),
  amortization: z.string().nullish(),
  loan_type: z.string().nullish(),
  spread: z.number().nullish(),
  benchmark: z.string().nullish(),
  debt_term: z.number().nullish(),
  stabilized_debt_yield: z.number().nullish(),
  stabilized_dscr: z.number().nullish(),
});

export const DealPropertyInformationSchema = z.object({
  market: z.string(),
  year_built: z.number().nullish(),
  number_of_buildings: z.number().nullish(),
  number_of_units: z.number().nullish(),
  site_area: z.number().nullish(),
  site_coverage: z.number().nullish(),
  zoning: z.string().nullish(),
  tax_parcel: z.string().nullish(),
  clear_heights: z.string().nullish(),
  column_spacing: z.string().nullish(),
  dock_high_doors: z.number().nullish(),
  drive_ins: z.string().nullish(),
  rail_doors: z.number().nullish(),
  loading_type: z.string().nullish(),
  truck_court_depth: z.string().nullish(),
  parking_spaces: z.number().nullish(),
  parking_ratio: z.number().nullish(),
  trailer_parking_spaces: z.string().nullish(),
  office_sf: z.number().nullish(),
  office_finish: z.number().nullish(),
  mezzanine_sf: z.number().nullish(),
  power_supply: z.string().nullish(),
  sprinkler_system: z.string().nullish(),
  lighting_system: z.string().nullish(),
  construction_type: z.string().nullish(),
  roof_type: z.string().nullish(),
  roof_installation_year: z.string().nullish(),
  roof_warranty_expiration: z.string().nullish(),
});

export const DealSchema = ExtendedDealInformationSchema.extend(
  DealUnderwritingAssumptionsSchema.shape
)
  .extend(DealLoanAssumptionsSchema.shape)
  .extend(DealPropertyInformationSchema.shape);

export const DealGeoLocationSchema = z
  .object({
    id: z.string(),
    name: z.string().nullish(),
    fund__name: z.string().nullish(),
    fund__id: z.string().nullish(),
    officer: GenericLabelValueObjectSchema().nullish(),
    status: GenericLabelValueObjectSchema(DealStatusSchema).nullish(),
    phase: GenericLabelValueObjectSchema(DealPhaseSchema).nullish(),
    sf: z.number().nullish(),
    equity: z.number().nullish(),
  })
  .merge(GenericAddressLatLongSchema);

export const DealsGeolocationSchema = z.array(DealGeoLocationSchema);

export const PipelineSummaryDealTotalSchema = z.object({
  phase: DealSchema.shape.phase,
  equity: DealSchema.shape.equity,
  sf: DealSchema.shape.sf,
  total_cost: z.number().nullish(),
  psa_execution_date: z.string().nullish(),
  go_hard_date: z.string().nullish(),
  closing_date: z.string().nullish(),
});

export const PipelineSummaryTableDealSchema = z.object({
  id: DealSchema.shape.id,
  phase: DealSchema.shape.phase,
  name: DealSchema.shape.name,
  equity: DealSchema.shape.equity,
  sf: DealSchema.shape.sf,
  total_cost: z.number().nullish(),
  psa_execution_date: z.string().nullish(),
  go_hard_date: z.string().nullish(),
  closing_date: z.string().nullish(),
});

export const DealImageSchema = DealAttachmentSchema.extend({
  type: z.literal("PROPERTY_PICTURE"),
});

export const DealPipelineSummarySchema = z.object({
  id: DealSchema.shape.id,
  phase: DealSchema.shape.phase,
  name: DealSchema.shape.name,
  equity: DealSchema.shape.equity,
  sf: DealSchema.shape.sf,
  address: DealSchema.shape.address,
  status: DealSchema.shape.status,
  has_post_screening_data: DealSchema.shape.has_post_screening_data,
  total_cost: z.number().nullish(),
  pictures: z.array(DealImageSchema),
});

export const CriticalDatesTableItemSchema = z.object({
  id: z.string(),
  deal_name: z.string().nullish(),
  deal_id: z.string().nullish(),
  activity: z.enum(CRITICAL_DATES_TABLE_ACTIVITIES),
  critical_date: z.string().nullish(),
  remaining_days: z.number().nullish(),
  amount: z.number().nullish(),
});

export const DealRoomItemSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  key: z.string().nullish(),
  file: z.string().nullish(),
  labels: z.array(GenericLabelValueObjectSchema()),
  notes: z.string().nullish(),
  deal: z.string().nullish(),
  uploaded_at: z.string().nullish(),
});

export const DealRoomItemPayloadSchema = DealRoomItemSchema.extend({
  labels: z.array(z.string()).nullish(),
});

export const DealMetricSchema = GenericLabelValueObjectSchema(
  z.union([z.string(), z.number()]).nullish()
);

export const EquityRequirementSchema = z
  .object({
    date: z.string().regex(new RegExp(`^(${YEAR_MONTHS.join("|")})\\s\\d{4}$`)),
  })
  .catchall(z.number());

export const DealTimelineItemSummarySchema = z.object({
  type: z.object({
    id: z.string(),
    name: z.string(),
  }),
  critical_date: z.string().nullish(),
  amount: z.number().nullish(),
  remaining_days: z.number().nullish(),
});

export const LocalDealRoomItemSchema = z.object({
  tempId: z.string().nullish(),
  name: z.string(),
  file: typeof window === "undefined" ? z.any() : z.instanceof(File),
  labels: z.array(GenericLabelValueObjectSchema()).nullish(),
  notes: z.string().nullish(),
});

export const PipelineStageSchema = z.object({
  name: z.string(),
  id: DealPhaseSchema,
});

export const DealsPipelineTotalSchema = z.object({
  phase: DealSchema.shape.phase,
  total_cost: z.number().nullable(),
  equity: z.number().nullable(),
  deals: z.number().nullable(),
});

export const UnlistCompPropsSchema = z.object({
  dealId: z.string(),
  compId: z.string(),
});

export const UploadDealPhotosToS3ParamsSchema = z.object({
  dealId: z.string(),
  photos: z.array(typeof window === "undefined" ? z.any() : z.instanceof(File)),
});

export const UploadDealPhotoToS3ParamsSchema = z.object({
  dealId: z.string(),
  photo: typeof window === "undefined" ? z.any() : z.instanceof(File),
});

export const UploadDealRoomItemsToS3Schema = z.object({
  dealId: z.string(),
  items: z.array(LocalDealRoomItemSchema).nullish(),
});

export const DealMapSchema = z.object({
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
  items: z.array(LocalDealRoomItemSchema).nullish(),
});

export const DealSummarySchema = z.object({
  id: z.string(),
  phase: DealSchema.shape.phase,
  deal_metrics: z
    .array(z.array(z.array(DealMetricSchema.nullish()).nullish()).nullish())
    .nullish(),
  strategy: z.string().nullish(),
  deal_room: z.array(DealRoomItemSchema),
  deal_timeline: z.array(DealTimelineItemSummarySchema),
  comments: z.string().nullish(),
  map: DealMapSchema.nullish(),
  pictures: z.array(DealImageSchema),
});

export const UploadDealRoomItemToS3Schema = z.object({
  dealId: z.string(),
  item: LocalDealRoomItemSchema,
});

export const DealPhotoPayloadSchema = z.object({
  deal: z.string(),
  name: z.string().nullish(),
  key: z.string().nullish(),
  type: z.literal(DEAL_FILE_TYPES.PROPERTY_PICTURE).nullish(),
});

export const EditDealInformationPayloadSchema = z.object({
  dealId: z.string(),
  dealInformation: ScreeningDealInformationPayloadSchema,
});

export const EditExtendedDealInformationPayloadSchema = z.object({
  dealId: z.string(),
  dealInformation: ExtendedDealInformationPayloadSchema,
});

export const UploadDealUnderwritingModelToS3Schema = z.object({
  dealId: z.string(),
  model: typeof window === "undefined" ? z.any() : z.instanceof(File),
  dealType: DealValueAddTypeSchema.nullish(),
});

export const DealUnderwritingModelPayloadSchema = z.object({
  deal: z.string(),
  name: z.string(),
  key: z.string(),
  type: z
    .literal(DEAL_FILE_TYPES.UW_MODEL)
    .or(z.literal(DEAL_FILE_TYPES.UW_DEVELOPMENT_MODEL)),
});

export const UploadDealWireInstructionToS3Schema = z.object({
  dealId: z.string(),
  instruction: typeof window === "undefined" ? z.any() : z.instanceof(File),
});

export const DealWireInstructionPayloadSchema = z.object({
  deal: z.string(),
  name: z.string().nullish(),
  key: z.string().nullish(),
  type: z.literal(DEAL_FILE_TYPES.WIRE_INSTRUCTION).nullish(),
});

export const EditDealCommonAttributesSchema = z.object({
  dealId: z.string(),
  dealInformation: DealCommonEditableAttributesPayloadSchema,
});

export const DealBackOfTheNapkinTableItemSummarySchema = z.object({
  type: z.object({
    id: z.string(),
    name: z.string(),
  }),
  critical_date: z.string().nullish(),
  amount: z.number().nullish(),
  remaining_days: z.number(),
});

export const PipelineBySchema = GenericLabelValueObjectSchema(z.number());

export const PostAssignCompsToDealPayloadSchema = z.object({
  dealId: DealSchema.shape.id,
  compIds: z.array(
    z.object({
      comp: CompSharedInformationSchema.shape.id,
    })
  ),
});

export const PostAssignCompstackCompToDealPayloadSchema = z.object({
  dealId: DealSchema.shape.id,
  compIds: z.array(z.union([z.string(), z.number()])),
});

export const DealsBySchema = GenericLabelValueObjectSchema(z.number());

export const DealStrategyTagSchema = GenericLabelValueObjectSchema();

export const DealFinancialScenarioKPIsSchema = z.object({
  unlevered_irr: z.number().nullish(),
  unlevered_moc: z.number().nullish(),
  gross_levered_irr: z.number().nullish(),
  gross_levered_moc: z.number().nullish(),
});

export const DealFinancialScenarioSchema = z.object({
  scenario_id: z.number(),
  name: z.string(),
  strategy: z.string().nullable(),
  deal: DealSchema.shape.id,
  kpis: DealFinancialScenarioKPIsSchema,
});

export const DealFinancialScenarioPayloadSchema = z.object({
  name: z.string(),
  strategy: z.string().nullable(),
});

export const DealFinancialScenarioInvestmentKPIsInnerSchema = z
  .object({
    key: z.string(),
    value: z.array(GenericTableRowColsSchema),
  })
  .nullish();

export const DealFinancialScenarioInvestmentKPIsSchema = z.array(
  DealFinancialScenarioInvestmentKPIsInnerSchema
);

export const UtilityScoreSchema = z.object({
  property_id: z.string().nullable(),
  base_value: z.number().nullable(), // $
  logistics_utility_score_scaled: z.number().nullable(), // %
  location_score_scaled: z.number().nullable(), // %
  property_score_scaled: z.number().nullable(), // %
  transaction_score_scaled: z.number().nullable(), // %
  estimated_annual_rent_psf: z.number().nullable(), // $
  location_score: z.number().nullable(), // $
  property_score: z.number().nullable(), // $
  transaction_score: z.number().nullable(), // $
  features: z
    .array(GenericLabelValueObjectSchema(z.number().nullable()))
    .nullable(),
});

export const DealTenantInformationSchema = z.object({
  id: z.string().nullable(),
  created: z.string().nullable(),
  modified: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  deal: z.string(),
});

export const DealTenantInformationPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  deal: z.string(),
});

export const DealRisksAndMitigantsSchema = z.object({
  id: z.string(),
  risk: z.string(),
  mitigant: z.string().nullish(),
  deal: z.string(),
});

export const DealRisksAndMitigantsPayloadSchema = z.object({
  risk: z.string(),
  mitigant: z.string(),
  deal: z.string(),
});
