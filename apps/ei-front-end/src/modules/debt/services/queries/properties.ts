import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { GetDebtPropertiesFilters } from "../api/properties";
import { queries } from "../keys";
import { parseError } from "@/commons/model-in/formatters/utils/errors";

export const useDebtProperties = (filters: GetDebtPropertiesFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.properties.all(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "properties",
        }),
        message: parseError(error),
      });
    },
  });
};
