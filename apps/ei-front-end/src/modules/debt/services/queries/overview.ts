import { GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { queries } from "../keys";
import { useAtom } from "jotai";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GetOverviewTimelineFilters } from "../api/overview";

export const useOverviewDebtInformation = (
  filters: GenericFilterPayload = {}
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.overview.debtInformation(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "debt information",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useOverviewTimeline = (filters: GetOverviewTimelineFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.overview.timeline(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "timeline",
        }),
        message: parseError(error),
      });
    },
  });
};
