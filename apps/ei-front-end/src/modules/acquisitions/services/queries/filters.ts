import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  getCompFilters,
  getCompstackCompChoices,
  getDealRoomFilters,
  getDealRoomLabels,
  getDealsByFilters,
  getDealsSummaryFilters,
  getEditDealChoices,
  getFundsOverviewFilters,
  getPipelineByFilters,
} from "../api/filters";
import { queries } from "../keys";
const { subjectErrorCRUD } = notificationMessages;

export const useOverviewFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.fundsOverview,
    queryFn: () => getFundsOverviewFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "overview (filters)",
        }),
        message: parseError(error),
      });
    },
  });
};
export const useDealsSummaryFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.dealsSummary,
    queryFn: () => getDealsSummaryFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "deal (filters)" }),
        message: parseError(error),
      });
    },
  });
};
export const useDealsByFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.dealsBy,
    queryFn: () => getDealsByFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deals by (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};
export const usePipelineByFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.pipelineBy,
    queryFn: () => getPipelineByFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "pipeline by (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useDealRoomFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.dealRoom,
    queryFn: () => getDealRoomFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal room (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useCompFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.compFilters,
    queryFn: () => getCompFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "comp (filters)" }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useDealRoomLabels = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.dealRoomLabels,
    queryFn: () => getDealRoomLabels(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal room labels",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useEditDealChoices = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.editDealChoices,
    queryFn: () => getEditDealChoices(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Edit deal choices",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useCompstackCompChoices = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.compstackCompChoices,
    queryFn: () => getCompstackCompChoices(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Compstack comp choices",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};
