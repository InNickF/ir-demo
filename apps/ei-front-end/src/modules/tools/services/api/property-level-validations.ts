import { querySerializer } from "@/commons/utils/query-serializer";
import {
  ListPropertyValidationFormPayload,
  SinglePropertyValidationFormPayload,
} from "../../typings/property-level-validations";
import {
  PropertyAccountReceivableSchema,
  PropertyBalanceSheetSchema,
  PropertyGeneralLedgerSchema,
  PropertyJournalEntrySchema,
  PropertyRuleDetailSchema,
  PropertyRuleSchema,
  PropertyValidationSchema,
} from "../../schemas/property-level-validations";
import { z } from "zod";
import { GenericFilterPayload } from "@/commons/typings";
import { privateAxios } from "@/commons/services/clients";
import {
  LegacyGenericLabelValueObjectSchema,
  PaginatedResponseSchema,
} from "@/commons/schemas/filters";

export const getListPropertyValidations = async (
  filters: ListPropertyValidationFormPayload
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/validations/summary/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyValidationSchema).parse(response.data);
};

export const getSinglePropertyValidations = async (
  filters: SinglePropertyValidationFormPayload
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/validations/summary/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyValidationSchema).parse(response.data);
};

export interface GetPropertyValidationRulesFilters
  extends GenericFilterPayload {
  property_code: string;
  month: string;
  year: string;
}
export const getPropertyValidationRules = async (
  filters: GetPropertyValidationRulesFilters
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/validations/export/${serializedQuery}`
  );

  return z.array(PropertyRuleSchema).parse(response.data);
};

export interface GetPropertyGeneralLedgerFilters extends GenericFilterPayload {
  property_code: string;
  month: string;
  year: string;
}
export const getPropertyGeneralLedger = async (
  filters: GetPropertyGeneralLedgerFilters
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/general-ledger/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyGeneralLedgerSchema).parse(
    response.data
  );
};

export interface GetPropertyRuleDetailFilters extends GenericFilterPayload {
  property_code: string;
  month: string;
  year: string;
  rule_code: string;
  detail_type: string;
}

export const getPropertyRuleDetail = async ({
  detail_type,
  ...filters
}: GetPropertyRuleDetailFilters) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/validations/details/${detail_type}/${serializedQuery}`
  );

  return z.array(PropertyRuleDetailSchema).parse(response.data);
};

export const getPropertyValidationRulesExportTypes = async () => {
  const response = await privateAxios.get(`/data-validations/exports-list/`);

  return z.array(LegacyGenericLabelValueObjectSchema()).parse(response.data);
};

export interface GetPropertyValidationsRulesExport
  extends GenericFilterPayload {
  url: string;
  fileName?: string;
}

export const getPropertyValidationsRulesExport = async ({
  url,
  ...filters
}: GetPropertyValidationsRulesExport) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(`${url}${serializedQuery}`);

  return response.data;
};

export interface PostTriggerDAGNotification {
  month: string;
  year: string;
}

export const postTriggerDAGNotification = async ({
  month,
  year,
}: PostTriggerDAGNotification) => {
  if (parseInt(month) < 10) {
    month = `0${month}`;
  }
  await privateAxios.post(`/asset/lambdas/property-validations/`, {
    rundate: `${year}-${month}-01`,
  });
};

export interface GetPropertyJournalEntriesFilters extends GenericFilterPayload {
  property_code: string;
  month: string;
  year: string;
}
export const getPropertyJournalEntries = async (
  filters: GetPropertyJournalEntriesFilters
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/journal-entries/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyJournalEntrySchema).parse(
    response.data
  );
};
export interface GetPropertyAccountReceivableFilters
  extends GenericFilterPayload {
  property_code: string;
  month: string;
  year: string;
}
export const getPropertyAccountReceivable = async (
  filters: GetPropertyAccountReceivableFilters
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/ar-trans/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyAccountReceivableSchema).parse(
    response.data
  );
};

export interface GetPropertyBalanceSheetsFilters extends GenericFilterPayload {
  property_code: string;
  month: string;
  year: string;
}

export const getPropertyBalanceSheet = async (
  filters: GetPropertyBalanceSheetsFilters
) => {
  const serializedQuery = querySerializer(filters);

  const response = await privateAxios.get(
    `/data-validations/balance-sheet/ep-bs-lender/${serializedQuery}`
  );

  return PaginatedResponseSchema(PropertyBalanceSheetSchema).parse(
    response.data
  );
};
