import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericChoice } from "@/commons/typings";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getDebtFilters, getPortfolioSummaryFilters } from "../api/filters";
import { queries } from "../keys";

export const usePortfolioSummaryFilters = (options?: {
  onSuccess?: (data: GenericChoice[]) => void;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.portfolioSummary,
    queryFn: () => getPortfolioSummaryFilters(),
    keepPreviousData: true,
    onSuccess(data) {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "portfolio summary (filters)",
        }),
        message: error?.toString(),
      });
    },
    staleTime: Infinity,
  });
};

export const useDebtFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.general,
    queryFn: () => getDebtFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "debt loans (filters)",
        }),
        message: error?.toString(),
      });
    },
  });
};
