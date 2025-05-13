import { z } from "zod";
import { RULE_STATUSES } from "../utils/property-level-validations";

export const ListPropertyValidationFormPayloadSchema = z.object({
  list_code: z.string(),
  month: z.string(),
  year: z.string(),
});

export const SinglePropertyValidationFormPayloadSchema = z.object({
  property_code: z.string(),
  month: z.string(),
  year: z.string(),
});

export const PropertyValidationSchema = z.object({
  date: z.string().nullish(),
  property_code: z.string().nullish(),
  property_name: z.string().nullish(),
  failed: z.number().nullish(),
  succeeded: z.number().nullish(),
  last_updated: z.string().nullish(),
});

export const PropertyValidationRuleSchema = z.object({
  key: z.string().nullish(),
  date: z.string().nullish(),
  value: z.string().nullish(),
});

export const PropertyValidationLedgerSchema = z.object({
  code: z.string().nullish(),
  account: z.string().nullish(),
  balance: z.number().nullish(),
});

export const PropertyRuleStatusSchema = z.enum(RULE_STATUSES);
export const PropertyRuleSchema = z.object({
  date: z.string().nullish(),
  property_code: z.string().nullish(),
  check_code: z.string().nullish(),
  check_name: z.string().nullish(),
  check_description: z.string().nullish(),
  check_pass: z.boolean().nullish(),
  detail_type: z.string().nullish(),
  qa_details: z.string().nullish(),
});

export const PropertyRuleDetailSchema = z.record(
  z.string().or(z.number()).nullish()
);

export const PropertyGeneralLedgerSchema = z.object({
  month: z.string().nullish(),
  entity_type: z.string().nullish(),
  entity_code: z.string().nullish(),
  account_code: z.string().nullish(),
  account_description: z.string().nullish(),
  month_start_balance: z.number().nullish(),
  month_end_balance: z.number().nullish(),
  month_to_date_balance_activity: z.number().nullish(),
});

export const PropertyJournalEntrySchema = z.object({
  transaction_date: z.string().nullish(),
  entity_code: z.string().nullish(),
  account_code: z.string().nullish(),
  account_description: z.string().nullish(),
  detail_id: z.number().nullish(),
  transaction_control: z.number().nullish(),
  transaction_control_code: z.string().nullish(),
  batch_header_transaction_id: z.number().nullish(),
  entity_name: z.string().nullish(),
  entity_type: z.string().nullish(),
  fund_name: z.string().nullish(),
  property_type: z.string().nullish(),
  post_month: z.string().nullish(),
  amount: z.number().nullish(),
  is_asset_currently_under_management: z.boolean().nullish(),
});

export const PropertyAccountReceivableSchema = z.object({
  property_code: z.string().nullish(),
  post_month: z.string().nullish(),
  transaction_date: z.string().nullish(),
  yardi_person_code: z.string().nullish(),
  person_name: z.string().nullish(),
  amount: z.number().nullish(),
  transaction_control_code: z.string().nullish(),
});

export const PropertyBalanceSheetSchema = z.object({
  account_code: z.string().nullish(),
  account_description: z.string().nullish(),
  month_end_balance: z.number().nullish(),
});
