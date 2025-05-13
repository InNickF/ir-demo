import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  ListPropertyValidationFormPayload,
  SinglePropertyValidationFormPayload,
} from "../../typings/property-level-validations";
import { queries } from "../keys";
import {
  GetPropertyAccountReceivableFilters,
  GetPropertyBalanceSheetsFilters,
  GetPropertyGeneralLedgerFilters,
  GetPropertyJournalEntriesFilters,
  GetPropertyRuleDetailFilters,
} from "../api/property-level-validations";

interface UseListPropertyValidationsParams {
  filters: ListPropertyValidationFormPayload;
}
export const useListPropertyValidations = ({
  filters,
}: UseListPropertyValidationsParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.listPropertyValidations(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "List Validations",
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.list_code && !!filters?.month && !!filters?.year,
    staleTime: Infinity,
    retry: false,
  });
};

interface UseSinglePropertyValidationsParams {
  filters: SinglePropertyValidationFormPayload;
}
export const useSinglePropertyValidations = ({
  filters,
}: UseSinglePropertyValidationsParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.singlePropertyValidations(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Single Property Validations",
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.property_code && !!filters?.month && !!filters?.year,
    staleTime: Infinity,
    retry: false,
  });
};

interface UsePropertyExecutedRulesParams {
  filters: GetPropertyGeneralLedgerFilters;
  enabled?: boolean;
}
export const usePropertyExecutedRules = ({
  filters,
  enabled = true,
}: UsePropertyExecutedRulesParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyValidationRules(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Executed Rules",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.property_code &&
      !!filters?.month &&
      !!filters?.year &&
      !!enabled,
    staleTime: Infinity,
    retry: false,
  });
};

interface UsePropertyEGeneralLedgerParams {
  filters: GetPropertyGeneralLedgerFilters;
  enabled?: boolean;
}
export const usePropertyEGeneralLedger = ({
  filters,
  enabled = true,
}: UsePropertyEGeneralLedgerParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyGeneralLedger(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Trial Balance",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.property_code &&
      !!filters?.month &&
      !!filters?.year &&
      !!enabled,
    staleTime: Infinity,
    retry: false,
  });
};

interface UsePropertyRuleDetailParams {
  filters: GetPropertyRuleDetailFilters;
  enabled?: boolean;
}

export const usePropertyRuleDetail = ({
  filters,
  enabled = true,
}: UsePropertyRuleDetailParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyRuleDetail(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Rule Detail",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.property_code &&
      !!filters?.month &&
      !!filters?.year &&
      !!filters?.rule_code &&
      !!filters?.detail_type &&
      !!enabled,
    staleTime: Infinity,
    retry: false,
  });
};

export const usePropertyValidationExportTypes = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyValidationsExportTypes(),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Validation Export Types",
        }),
        message: parseError(error),
      });
    },
    enabled: true,
    staleTime: Infinity,
    retry: false,
  });
};

interface UsePropertyJournalEntriesParams {
  filters: GetPropertyJournalEntriesFilters;
  enabled?: boolean;
}
export const usePropertyJournalEntries = ({
  filters,
  enabled = true,
}: UsePropertyJournalEntriesParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyJournalEntries(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Journal Entries",
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters && !!enabled,
  });
};
interface UsePropertyAccountReceivableParams {
  filters: GetPropertyAccountReceivableFilters;
  enabled?: boolean;
}
export const usePropertyAccountReceivable = ({
  filters,
  enabled = true,
}: UsePropertyAccountReceivableParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyAccountReceivable(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Account Receivable",
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters && !!enabled,
  });
};

interface UsePropertyBalanceSheetParams {
  filters: GetPropertyBalanceSheetsFilters;
  enabled?: boolean;
}

export const usePropertyBalanceSheets = ({
  filters,
  enabled = true,
}: UsePropertyBalanceSheetParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.propertyLevelValidations.propertyBalanceSheets(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Balance Sheet",
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters && !!enabled,
    staleTime: Infinity,
    retry: false,
  });
};
