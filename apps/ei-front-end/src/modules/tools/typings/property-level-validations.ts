import { z } from "zod";
import {
  ListPropertyValidationFormPayloadSchema,
  PropertyAccountReceivableSchema,
  PropertyBalanceSheetSchema,
  PropertyGeneralLedgerSchema,
  PropertyJournalEntrySchema,
  PropertyRuleDetailSchema,
  PropertyRuleSchema,
  PropertyRuleStatusSchema,
  PropertyValidationLedgerSchema,
  PropertyValidationRuleSchema,
  PropertyValidationSchema,
  SinglePropertyValidationFormPayloadSchema,
} from "../schemas/property-level-validations";
import { FINANCIAL_OVERVIEW_VIEWS } from "../utils/property-level-validations";

export type ListPropertyValidationFormPayload = z.infer<
  typeof ListPropertyValidationFormPayloadSchema
>;
export type SinglePropertyValidationFormPayload = z.infer<
  typeof SinglePropertyValidationFormPayloadSchema
>;

export type PropertyValidation = z.infer<typeof PropertyValidationSchema>;

export type PropertyValidationRule = z.infer<
  typeof PropertyValidationRuleSchema
>;

export type PropertyValidationLedger = z.infer<
  typeof PropertyValidationLedgerSchema
>;

export type PropertyRuleStatus = z.infer<typeof PropertyRuleStatusSchema>;

export type PropertyRule = z.infer<typeof PropertyRuleSchema>;

export type PropertyRuleDetail = z.infer<typeof PropertyRuleDetailSchema>;

export type PropertyGeneralLedger = z.infer<typeof PropertyGeneralLedgerSchema>;

export type PropertyFinancialOverviewViews =
  typeof FINANCIAL_OVERVIEW_VIEWS[number];

export type PropertyJournalEntry = z.infer<typeof PropertyJournalEntrySchema>;

export type PropertyAccountReceivable = z.infer<
  typeof PropertyAccountReceivableSchema
>;

export type PropertyBalanceSheet = z.infer<typeof PropertyBalanceSheetSchema>;
