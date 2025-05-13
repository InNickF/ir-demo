import { GenericFilterPayload, PaginatedResponse } from "@/commons/typings";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { queries } from "../keys";
import { useAtom } from "jotai";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GetDebtLoanCapMappings } from "../api/loans";
import { DebtLoanCapSchema } from "../../schemas/loans";

export const useDebtLoans = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoans(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "loans",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDebtLoanSummary = ({
  id,
  filters,
}: {
  id: string;
  filters?: GenericFilterPayload;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoanSummary({
      id,
      ...cleanEmptyObjectValues(filters),
    }),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "loan summary",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDebtLoanCovenantTesting = ({
  id,
  filters,
}: {
  id: string;
  filters?: GenericFilterPayload;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoanCovenantTesting({
      id,
      ...cleanEmptyObjectValues(filters),
    }),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "loan covenant testing",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDebtLoanReporting = ({
  id,
  filters,
}: {
  id: string;
  filters?: GenericFilterPayload;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoanReporting({
      id,
      ...cleanEmptyObjectValues(filters),
    }),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "loan reporting",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDebtLoanTimeline = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoanTimeline(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "loan timeline",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDebtLoanRoom = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoanRoom(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "loan room",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDebtLoanCapMappings = (
  filters: GetDebtLoanCapMappings,
  options?: {
    onSuccess?: (data: PaginatedResponse<typeof DebtLoanCapSchema>) => void;
  }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.loans.debtLoanCapMappings(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Loan Cap Mappings",
        }),
        message: parseError(error),
      });
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
};
