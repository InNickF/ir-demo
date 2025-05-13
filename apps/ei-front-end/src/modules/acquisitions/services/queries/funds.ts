import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues, notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { queries } from "../keys";
const { subjectErrorCRUD } = notificationMessages;

export const useFundsKPIs = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.funds.kpis(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "fund KPIs" }),
        message: parseError(error),
      });
    },
  });
};
