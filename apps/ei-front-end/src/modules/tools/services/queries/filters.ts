import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  getAssetPropertiesFilters,
  getValidationsChoices,
} from "../api/filters";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { queries } from "../keys";

export const useAssetsPropertiesFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.assetsProperties,
    queryFn: () => getAssetPropertiesFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Assets Properties (filters)",
        }),
        message: error?.toString(),
      });
    },
  });
};

export const useValidationsChoices = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.validationsChoices,
    queryFn: () => getValidationsChoices(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Validations Choices",
        }),
        message: error?.toString(),
      });
    },
    staleTime: Infinity,
  });
};
