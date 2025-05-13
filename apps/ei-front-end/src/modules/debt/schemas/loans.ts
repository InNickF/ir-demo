import { FileSchema } from "@/commons/schemas/files";
import {
  GenericLabelValueObjectSchema,
  LegacyGenericLabelValueObjectSchema,
} from "@/commons/schemas/filters";
import { z } from "zod";
import { LOAN_FILE_TYPES } from "../utils";

export const DebtLoanCommonKeys = z.object({
  id: z.string(),
  loan_amount_max_commitment: z.string().nullish(),
  current_outstanding_loan_balance: z.string().nullish(),
  initial_maturity_date: z.string().nullish(),
  calculated_interest_rate: z.string().nullish(),
  borrower_name: z.string().nullish(),
  contract_file: z.string().nullish(),
  fund_name: z.string().nullish(),
  lender_name: z.string().nullish(),
  loan_name: z.string().nullish(),
  is_loan_active: z.boolean().nullish(),
});

export const DebtLoanSchema = z.object({
  id: z.string().nullish(),
  loan_name: z.string().nullish(),
  borrower_name: z.string().nullish(),
  fund_name: z.string().nullish(),
  lender_name: z.string().nullish(),
  current_outstanding_loan_balance: z.number().nullish(),
  note_date: z.string().nullish(),
  calculated_interest_rate: z.number().nullish(),
  spread: z.number().nullish(),
  index_name: z.string().nullish(),
  index_rate: z.number().nullish(),
  updated_at: z.string().nullish(),
  debt_yield_over_last_12_months_noidm: z.number().nullish(),
  debt_yield_leased_noidm: z.number().nullish(),
  yield_on_cost_over_last_12_months_noidm: z.number().nullish(),
  yield_on_cost_leased_noidm: z.number().nullish(),
  current_dscr: z.number().nullish(),
  dscr_over_last_12_months_noidm: z.number().nullish(),
  dscr_leased_noidm: z.number().nullish(),
  current_ltv: z.number().nullish(),
  amortization_type: z.string().nullish(),
  expiration_date: z.string().nullish(),
  percentage_debt: z.number().nullish(),
  original_term: z.number().nullish(),
  rate_cap_vs_swap: z.string().nullish(),
  sorting: z.number().nullish(),
  loan_amount_max_commitment: z.number().nullish(),
  initial_maturity_date: z.string().nullish(),
  maturity_date: z.string().nullish(),
  index_description: z.string().nullish(),
  index_spread: z.string().nullish(),
  current_notional: z.number().nullish(),
  chatham_loan_name: z.string().nullish(),
  current_strike: z.number().nullish(),
});

const createBaseDebtLoanContentSchema = <
  TKey extends z.ZodType = z.ZodType<string>
>(
  keySchema: TKey = z.string() as unknown as TKey
) =>
  z.object({
    key: keySchema,
    label: z.string().nullish(),
    value: z.union([z.string(), z.number(), z.boolean()]).nullish(),
  });

const createBaseDebtLoanDetailSchema = <
  TContent extends z.ZodType = z.ZodType<string>
>(
  contentSchema: TContent = z.string() as unknown as TContent
) =>
  z.object({
    key: z.string(),
    content: z.array(contentSchema),
    columns: z.array(LegacyGenericLabelValueObjectSchema()).nullish(),
  });

const createBaseDebtLoanDetailWithDefinitionSchema = <
  TDefinition extends z.ZodType = z.ZodType<string>,
  TDetail extends z.ZodObject<z.ZodRawShape> = z.ZodObject<z.ZodRawShape>
>(
  definitionSchema: TDefinition = z.string() as unknown as TDefinition,
  detailSchema: TDetail = z.object as unknown as TDetail
) =>
  z
    .object({
      definition: z.array(definitionSchema).nullish(),
    })
    .merge(detailSchema);

const createBaseDebtLoanSchema = <
  TDetail extends z.ZodObject<z.ZodRawShape> = z.ZodObject<z.ZodRawShape>
>(
  detailSchema: TDetail = z.object as unknown as TDetail
) =>
  z
    .object({
      borrower_name: z.string().nullish(),
      detail: z.array(detailSchema),
    })
    .merge(DebtLoanCommonKeys);

export const DebtLoanCovenantTestingContentKeysSchema = z.object({
  dy_definition: z.string().nullish(),
  dscr_definition: z.string().nullish(),
  noi_definition: z.string().nullish(),
  revenue_calc: z.string().nullish(),
  expenses: z.string().nullish(),
  vacancy_factor: z.number().nullish(),
  replacement_reserves_in_usd_psf: z.number().nullish(),
  rollover_reserves_in_usd_psf: z.number().nullish(),
  management_fee_in_percentage: z.string().nullish(),
  dscr_covenant: z.boolean().nullish(),
  dscr_calculation_recurrence: z.string().nullish(),
  dscr_prong_1a_cash_sweep_trigger_ratio: z.string().nullish(),
  dscr_prong_2a_cash_mgmt_trigger_ratio: z.string().nullish(),
  dcsr_parameters_1: z.string().nullish(),
  dcsr_parameters_1_period_start_date: z.string().nullish(),
  dcsr_parameters_1_period_end_date: z.string().nullish(),
  dcsr_parameters_1_performance_threshold: z.number().nullish(),
  dy_covenant_recurrence: z.string().nullish(),
  dy_calculation_recurrence: z.string().nullish(),
  dy_prong_1a_cash_sweep_trigger_percentage: z.string().nullish(),
  dy_prong_2a_cash_mgmt_trigger_percentage: z.string().nullish(),
  dy_parameters_1: z.string().nullish(),
  dy_parameters_1_period_start_date: z.string().nullish(),
  dy_parameters_1_period_end_date: z.string().nullish(),
  dy_parameters_1_performance_threshold: z.number().nullish(),
});

export const DebtLoanSummaryContentKeysSchema = z.object({
  chatham_cap_name: z.string().nullish(),
  lender_name: z.string().nullish(),
  note_date: z.string().nullish(),
  initial_maturity_date: z.string().nullish(),
  fully_extended_maturity_date: z.string().nullish(),
  original_term: z.string().nullish(),
  amort_term: z.string().nullish(),
  amortization_type: z.string().nullish(),
  loan_amount_max_commitment: z.number().nullish(),
  current_outstanding_loan_balance: z.number().nullish(),
  loan_amount_initial: z.number().nullish(),
  loan_type: z.string().nullish(),
  spread: z.number().nullish(),
  all_in_floor: z.number().nullish(),
  accrual_type: z.string().nullish(),
  index_name: z.string().nullish(),
  carveout_guarantor: z.string().nullish(),
  borrower_recourse: z.string().nullish(),
  recourse_type: z.string().nullish(),
  net_worth_liquidity_first_test_date: z.string().nullish(),
  net_worth_liquidity_test_reoccurrence: z.string().nullish(),
  net_worth_covenant: z.number().nullish(),
  liquidity_covenant: z.number().nullish(),
  debt_yield_over_last_12_months_noidm: z.number().nullish(),
  dscr_over_last_12_months_noidm: z.number().nullish(),
  calculated_interest_rate: z.number().nullish(),
  yield_on_cost_over_last_12_months_noidm: z.number().nullish(),
  current_ltv: z.number().nullish(),
  current_strike: z.number().nullish(),
  current_notional: z.number().nullish(),
  index_rate: z.number().nullish(),
  maturity_date: z.string().nullish(),
  cap_maturity_date: z.string().nullish(),
  chatham_loan_name: z.string().nullish(),
});

export const DebtLoanCovenantTestingContentSchema =
  createBaseDebtLoanContentSchema(
    z.enum(
      Object.keys(DebtLoanCovenantTestingContentKeysSchema.shape) as [
        keyof typeof DebtLoanCovenantTestingContentKeysSchema.shape
      ]
    )
  );

export const DebtLoanCovenantTestingBaseDetailSchema =
  createBaseDebtLoanDetailSchema(DebtLoanCovenantTestingContentSchema);

export const DebtLoanCovenantTestingDetailSchema =
  createBaseDebtLoanDetailWithDefinitionSchema(
    DebtLoanCovenantTestingContentSchema,
    DebtLoanCovenantTestingBaseDetailSchema
  );

export const DebtLoanCovenantTestingSchema = createBaseDebtLoanSchema(
  DebtLoanCovenantTestingDetailSchema
);

export const DebtLoanSummaryContentSchema = createBaseDebtLoanContentSchema(
  z.enum(
    Object.keys(DebtLoanSummaryContentKeysSchema.shape) as [
      keyof typeof DebtLoanSummaryContentKeysSchema.shape
    ]
  )
);

export const DebtLoanSummaryDetailSchema = createBaseDebtLoanDetailSchema(
  DebtLoanSummaryContentSchema
);

export const DebtLoanSummarySchema = createBaseDebtLoanSchema(
  DebtLoanSummaryDetailSchema
);

export const DebtLoanReportingContentSchema = z.object({
  key: z.string(),
  content: z
    .array(
      LegacyGenericLabelValueObjectSchema(
        z.union([z.string(), z.number(), z.boolean()]).nullish()
      )
    )
    .nullish(),
});

export const DebtLoanReportingDetailSchema = createBaseDebtLoanDetailSchema(
  DebtLoanReportingContentSchema
);

export const DebtLoanReportingSchema = createBaseDebtLoanSchema(
  DebtLoanReportingDetailSchema
);

export const LegacyDebtLoanPayloadSchema = z.object({
  property: LegacyGenericLabelValueObjectSchema(),
  abstract_file: FileSchema,
});

export const DebtLoanPayloadSchema = z.object({
  loan_name: LegacyGenericLabelValueObjectSchema(),
  properties: z.array(LegacyGenericLabelValueObjectSchema()),
  abstract_file: FileSchema,
});

export const DebtLoanContractPayloadSchema = z.object({
  loan_abstract_id: z.string(),
  contract_file: FileSchema,
});

export const DebtLoanAbstractFilePayloadSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(LOAN_FILE_TYPES),
  key: z.string(),
  loan_abstract_id: z.string().nullish(),
});

export const DebLoanAbstractFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.literal(LOAN_FILE_TYPES.LOAN_ABSTRACT_EXCEL_FILE),
  file: z.string(),
  loan_abstract_id: z.string()?.nullable(),
  updated_at: z.string()?.nullish(),
});

export const DebtLoanContractFileSchema = DebLoanAbstractFileSchema.extend({
  type: z.literal(LOAN_FILE_TYPES.LOAN_CONTRACT_FILE),
});

export const DebLoanContractFilePayloadSchema = z.object({
  name: z.string(),
  key: z.string(),
  type: z.literal(LOAN_FILE_TYPES.LOAN_CONTRACT_FILE),
  loan_abstract_id: z.string(),
});

export const DebtLoanTimelineSchema = z.object({
  id: z.string().nullish(),
  loan_abstract_id: z.string().nullish(),
  type: z.string().nullish(),
  notable_date: z.string().nullish(),
  comment: z.string().nullish(),
  loan_name: z.string().nullish(),
});

export const DebtLoanRoomItemSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  key: z.string().nullish(),
  file: z.string().nullish(),
  type: GenericLabelValueObjectSchema(),
  loan_abstract_id: z.string().nullish(),
  uploaded_at: z.string().nullish(),
});

export const DebtLocalLoanRoomItemSchema = z.object({
  tempId: z.string().nullish(),
  name: z.string(),
  file: typeof window === "undefined" ? z.any() : z.instanceof(File),
  type: GenericLabelValueObjectSchema().nullish(),
});

export const DebtUploadLoanRoomItemToS3Schema = z.object({
  loan_abstract_id: z.string(),
  item: DebtLocalLoanRoomItemSchema,
});

export const DebtLoanStatusPayloadSchema = z.object({
  is_loan_active: z.boolean(),
  loan_name: z.string(),
});

export const DebtLoanStatusSchema = z
  .object({
    lender_name: z.string().nullish(),
    note_date: z.string().nullish(),
  })
  .merge(DebtLoanStatusPayloadSchema);

export const DebtLoanCapSchema = z.object({
  loan_name: z.string(),
  chatham_loan_name: z.string(),
});
