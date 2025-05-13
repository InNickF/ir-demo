import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { queries } from "../keys";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { parseError } from "@/commons/model-in/formatters/utils/errors";

export const useFundKpis = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.fund.kpis(objectWithSomeValueOrNull(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "kpis" }),
        message: parseError(error),
      });
    },
  });
};

export const useFundLendersLegacy = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.fund.lenders(objectWithSomeValueOrNull(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "lenders" }),
        message: parseError(error),
      });
    },
  });
};

export const useFundMaturityLenders = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.fund.maturityLenders(objectWithSomeValueOrNull(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "maturity lenders",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useFundLendersByLtv = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.fund.lendersByLtv(objectWithSomeValueOrNull(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "lenders ltv",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useFundOutstandingBalanceByLenders = (
  filters: GenericFilterPayload = {}
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.fund.outstandingBalanceByLenders(
      objectWithSomeValueOrNull(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "outstanding balance by lenders",
        }),
        message: parseError(error),
      });
    },
  });
};
