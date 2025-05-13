import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { queries } from "../keys";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";

export const useProjectedNoiGrowth = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolioGrowth.projectedNoiGrowth(filters),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "projected NOI growth",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGeographicConcentration = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolioGrowth.geographicConcentration(
      objectWithSomeValueOrNull(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "geographic concentration",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useAssetLocation = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolioGrowth.assetLocation(
      objectWithSomeValueOrNull(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "asset location",
        }),
        message: parseError(error),
      });
    },
  });
};
