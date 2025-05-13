import { GenericLabelValueObject } from "@/commons/typings";
import { z } from "zod";
import {
  BasicDealInformationSchema,
  CriticalDatesTableItemSchema,
  DealAttachmentSchema,
  DealBackOfTheNapkinInformationSchema,
  DealBackOfTheNapkinTableItemSummarySchema,
  DealCommonEditableAttributesPayloadSchema,
  DealCommonEditableAttributesSchema,
  DealFilesSchema,
  DealFinancialScenarioInvestmentKPIsInnerSchema,
  DealFinancialScenarioInvestmentKPIsSchema,
  DealFinancialScenarioKPIsSchema,
  DealFinancialScenarioPayloadSchema,
  DealFinancialScenarioSchema,
  DealFormTimelineItemSchema,
  DealGeoLocationSchema,
  DealHasPostScreeningDataSchema,
  DealHasUWModelSchema,
  DealImageSchema,
  DealLawClosingProbabilityObjectPayloadSchema,
  DealLawClosingProbabilitySchema,
  DealLoanAssumptionsSchema,
  DealMapSchema,
  DealMetricSchema,
  DealPhaseObjectPayloadSchema,
  DealPhaseObjectSchema,
  DealPhaseSchema,
  DealPhotoPayloadSchema,
  DealPipelineSummarySchema,
  DealPropertyInformationSchema,
  DealRisksAndMitigantsPayloadSchema,
  DealRisksAndMitigantsSchema,
  DealRoomItemPayloadSchema,
  DealRoomItemSchema,
  DealSchema,
  DealSpecsInformationSchema,
  DealStatusObjectPayloadSchema,
  DealStatusObjectSchema,
  DealStatusSchema,
  DealStrategyTagSchema,
  DealSummarySchema,
  DealTenantInformationPayloadSchema,
  DealTenantInformationSchema,
  DealTimelineItemPayloadSchema,
  DealTimelineItemSchema,
  DealTimelineItemSummarySchema,
  DealTimelineItemValuesSchema,
  DealTimelineKeysSchema,
  DealUnderwritingAssumptionsSchema,
  DealUnderwritingModelPayloadSchema,
  DealUnderwritingModelSchema,
  DealValueAddTypeSchema,
  DealWireInstructionPayloadSchema,
  DealsBySchema,
  DealsGeolocationSchema,
  DealsPipelineTotalSchema,
  EditDealCommonAttributesSchema,
  EditDealInformationPayloadSchema,
  EditExtendedDealInformationPayloadSchema,
  EquityRequirementSchema,
  ExtendedDealInformationPayloadSchema,
  ExtendedDealInformationSchema,
  ExtendedDealInformationWithFilesAndTimelineSchema,
  LocalDealRoomItemSchema,
  MarketRentTypeSchema,
  PipelineBySchema,
  PipelineStageSchema,
  PipelineSummaryDealTotalSchema,
  PipelineSummaryTableDealSchema,
  PostAssignCompsToDealPayloadSchema,
  PostAssignCompstackCompToDealPayloadSchema,
  ScreeningDealInformationPayloadSchema,
  ScreeningDealInformationSchema,
  UnlistCompPropsSchema,
  UploadDealPhotoToS3ParamsSchema,
  UploadDealPhotosToS3ParamsSchema,
  UploadDealRoomItemToS3Schema,
  UploadDealRoomItemsToS3Schema,
  UploadDealUnderwritingModelToS3Schema,
  UploadDealWireInstructionToS3Schema,
  UtilityScoreSchema,
} from "../schemas/deals";

export type DealPhase = z.infer<typeof DealPhaseSchema>;

export type DealPhaseWithoutScreening = Exclude<DealPhase, "SCREENING">;

export type DealStatus = z.infer<typeof DealStatusSchema>;

export type DealLawClosingProbability = z.infer<
  typeof DealLawClosingProbabilitySchema
>;

export type MarketRentType = z.infer<typeof MarketRentTypeSchema>;

export type IDealPhase = z.infer<typeof DealPhaseObjectSchema>;

export type IDealStatus = z.infer<typeof DealStatusObjectSchema>;
export interface IDealLawClosingProbability {
  law_firm_closing_probability?: GenericLabelValueObject<
    typeof DealLawClosingProbabilitySchema
  >;
}
export type DealCommonEditableAttributes = z.infer<
  typeof DealCommonEditableAttributesSchema
>;

export type IDealPhasePayload = z.infer<typeof DealPhaseObjectPayloadSchema>;

export type IDealStatusPayload = z.infer<typeof DealStatusObjectPayloadSchema>;

export type IDealLawClosingProbabilityPayload = z.infer<
  typeof DealLawClosingProbabilityObjectPayloadSchema
>;

export type IDealHasPostScreeningData = z.infer<
  typeof DealHasPostScreeningDataSchema
>;

export type IDealHasUWModel = z.infer<typeof DealHasUWModelSchema>;

export type DealCommonEditableAttributesPayload = z.infer<
  typeof DealCommonEditableAttributesPayloadSchema
>;

export type BasicDealInformation = z.infer<typeof BasicDealInformationSchema>;

export type DealBackOfTheNapkinInformation = z.infer<
  typeof DealBackOfTheNapkinInformationSchema
>;

export type DealSpecsInformation = z.infer<typeof DealSpecsInformationSchema>;

export type DealUnderwritingModel = z.infer<typeof DealUnderwritingModelSchema>;

export type ScreeningDealInformation = z.infer<
  typeof ScreeningDealInformationSchema
>;

export type ScreeningDealInformationPayload = z.infer<
  typeof ScreeningDealInformationPayloadSchema
>;

export type ExtendedDealInformation = z.infer<
  typeof ExtendedDealInformationSchema
>;

export type ExtendedDealInformationPayload = z.infer<
  typeof ExtendedDealInformationPayloadSchema
>;

export type DealFiles = z.infer<typeof DealFilesSchema>;

export type ExtendedDealInformationWithFilesAndTimeline = z.infer<
  typeof ExtendedDealInformationWithFilesAndTimelineSchema
>;

export type Deal = z.infer<typeof DealSchema>;

export type DealGeoLocation = z.infer<typeof DealGeoLocationSchema>;

export type DealsGeoLocation = z.infer<typeof DealsGeolocationSchema>;

export type PipelineSummaryDealTotal = z.infer<
  typeof PipelineSummaryDealTotalSchema
>;

export type PipelineSummaryTableDeal = z.infer<
  typeof PipelineSummaryTableDealSchema
>;

export type DealsBy = z.infer<typeof DealsBySchema>;

export type PipelineBy = z.infer<typeof PipelineBySchema>;

export type CriticalDatesTableItem = z.infer<
  typeof CriticalDatesTableItemSchema
>;

export type DealImage = z.infer<typeof DealImageSchema>;

export type LocalDealRoomItem = z.infer<typeof LocalDealRoomItemSchema>;

export type DealRoomItem = z.infer<typeof DealRoomItemSchema>;

export type DealRoomItemPayload = z.infer<typeof DealRoomItemPayloadSchema>;

export type DealMetric = z.infer<typeof DealMetricSchema>;

export type DealTimelineItemSummary = z.infer<
  typeof DealTimelineItemSummarySchema
>;

export type EquityRequirement = z.infer<typeof EquityRequirementSchema>;

export type DealPipelineSummary = z.infer<typeof DealPipelineSummarySchema>;

export type PipelineStage = z.infer<typeof PipelineStageSchema>;

export type DealsPipelineTotal = z.infer<typeof DealsPipelineTotalSchema>;

export type DealStrategyTag = z.infer<typeof DealStrategyTagSchema>;

export type UnlistCompProps = z.infer<typeof UnlistCompPropsSchema>;

export type UploadDealPhotosToS3Params = z.infer<
  typeof UploadDealPhotosToS3ParamsSchema
>;

export type UploadDealPhotoToS3Params = z.infer<
  typeof UploadDealPhotoToS3ParamsSchema
>;

export type UploadDealRoomItemsToS3 = z.infer<
  typeof UploadDealRoomItemsToS3Schema
>;

export type DealSummary = z.infer<typeof DealSummarySchema>;

export type DealMap = z.infer<typeof DealMapSchema>;

export type UploadDealRoomItemToS3 = z.infer<
  typeof UploadDealRoomItemToS3Schema
>;

export type DealPhotoPayload = z.infer<typeof DealPhotoPayloadSchema>;

export type EditDealInformationPayload = z.infer<
  typeof EditDealInformationPayloadSchema
>;

export type EditExtendedDealInformationPayload = z.infer<
  typeof EditExtendedDealInformationPayloadSchema
>;

export type UploadDealUnderwritingModelToS3 = z.infer<
  typeof UploadDealUnderwritingModelToS3Schema
>;
export type DealUnderwritingModelPayload = z.infer<
  typeof DealUnderwritingModelPayloadSchema
>;

export type UploadDealWireInstructionToS3 = z.infer<
  typeof UploadDealWireInstructionToS3Schema
>;

export type DealWireInstructionPayload = z.infer<
  typeof DealWireInstructionPayloadSchema
>;

export type DealTimelineKeys = z.infer<typeof DealTimelineKeysSchema>;

export type DealTimelineItemValues = z.infer<
  typeof DealTimelineItemValuesSchema
>;

export type DealFormTimelineItem = z.infer<typeof DealFormTimelineItemSchema>;

export type DealTimelineItem = z.infer<typeof DealTimelineItemSchema>;

export type DealTimelineItemPayload = z.infer<
  typeof DealTimelineItemPayloadSchema
>;

export type DealAttachment = z.infer<typeof DealAttachmentSchema>;

export type EditDealCommonAttributes = z.infer<
  typeof EditDealCommonAttributesSchema
>;

export type DealBackOfTheNapkinTableItemSummary = z.infer<
  typeof DealBackOfTheNapkinTableItemSummarySchema
>;

export type PostAssignCompsToDealPayload = z.infer<
  typeof PostAssignCompsToDealPayloadSchema
>;

export type PostAssignCompstackCompToDealPayload = z.infer<
  typeof PostAssignCompstackCompToDealPayloadSchema
>;

export type DealUnderwritingAssumptions = z.infer<
  typeof DealUnderwritingAssumptionsSchema
>;

export type DealLoanAssumptions = z.infer<typeof DealLoanAssumptionsSchema>;

export type DealPropertyInformation = z.infer<
  typeof DealPropertyInformationSchema
>;

export type DealFinancialScenarioKPIs = z.infer<
  typeof DealFinancialScenarioKPIsSchema
>;

export type DealFinancialScenario = z.infer<typeof DealFinancialScenarioSchema>;

export type DealFinancialScenarioPayload = z.infer<
  typeof DealFinancialScenarioPayloadSchema
>;

export type DealFinancialScenarioInvestmentKPIs = z.infer<
  typeof DealFinancialScenarioInvestmentKPIsSchema
>;

export type DealFinancialScenarioInvestmentKPIsInner = z.infer<
  typeof DealFinancialScenarioInvestmentKPIsInnerSchema
>;

export type UtilityScore = z.infer<typeof UtilityScoreSchema>;

export type DealValueAddType = z.infer<typeof DealValueAddTypeSchema>;

export type DealTenantInformation = z.infer<typeof DealTenantInformationSchema>;

export type DealTenantInformationPayload = z.infer<
  typeof DealTenantInformationPayloadSchema
>;

export type DealRisksAndMitigants = z.infer<typeof DealRisksAndMitigantsSchema>;

export type DealRisksAndMitigantsPayload = z.infer<
  typeof DealRisksAndMitigantsPayloadSchema
>;
