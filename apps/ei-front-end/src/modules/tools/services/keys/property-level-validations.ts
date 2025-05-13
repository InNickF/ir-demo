import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  ListPropertyValidationFormPayload,
  SinglePropertyValidationFormPayload,
} from "../../typings/property-level-validations";
import {
  getListPropertyValidations,
  getPropertyGeneralLedger,
  GetPropertyGeneralLedgerFilters,
  getPropertyRuleDetail,
  GetPropertyRuleDetailFilters,
  getPropertyValidationRulesExportTypes,
  getPropertyValidationRules,
  GetPropertyValidationRulesFilters,
  getSinglePropertyValidations,
  GetPropertyJournalEntriesFilters,
  getPropertyJournalEntries,
  getPropertyAccountReceivable,
  GetPropertyAccountReceivableFilters,
  GetPropertyBalanceSheetsFilters,
  getPropertyBalanceSheet,
} from "../api/property-level-validations";

export const propertyLevelValidationQueries = createQueryKeys(
  "propertyLevelValidations",
  {
    listPropertyValidations: (params: ListPropertyValidationFormPayload) => ({
      queryKey: [{ params }],
      queryFn: () => getListPropertyValidations(params),
    }),
    singlePropertyValidations: (
      params: SinglePropertyValidationFormPayload
    ) => ({
      queryKey: [{ params }],
      queryFn: () => getSinglePropertyValidations(params),
    }),
    propertyValidationRules: (params: GetPropertyValidationRulesFilters) => ({
      queryKey: [{ params }],
      queryFn: () => getPropertyValidationRules(params),
    }),
    propertyGeneralLedger: (params: GetPropertyGeneralLedgerFilters) => ({
      queryKey: [{ params }],
      queryFn: () => getPropertyGeneralLedger(params),
    }),
    propertyRuleDetail: (params: GetPropertyRuleDetailFilters) => ({
      queryKey: [{ params }],
      queryFn: () => getPropertyRuleDetail(params),
    }),
    propertyValidationsExportTypes: () => ({
      queryKey: [{}],
      queryFn: () => getPropertyValidationRulesExportTypes(),
    }),
    propertyJournalEntries: (params: GetPropertyJournalEntriesFilters) => ({
      queryKey: [{ params }],
      queryFn: () => getPropertyJournalEntries(params),
    }),
    propertyAccountReceivable: (
      params: GetPropertyAccountReceivableFilters
    ) => ({
      queryKey: [{ params }],
      queryFn: () => getPropertyAccountReceivable(params),
    }),
    propertyBalanceSheets: (params: GetPropertyBalanceSheetsFilters) => ({
      queryKey: [{ params }],
      queryFn: () => getPropertyBalanceSheet(params),
    }),
  }
);
