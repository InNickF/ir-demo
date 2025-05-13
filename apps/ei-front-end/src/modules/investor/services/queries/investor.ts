import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { notificationMessages } from "@/commons/utils";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { queries } from "../keys";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { getAllInvestors } from "../api/investor";
import { GenericLabelValueObject } from "@/commons/typings";

const { subjectErrorCRUD } = notificationMessages;

export const useGetAllInvestors = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.investor.investors,
    queryFn: () => getAllInvestors(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "all investors",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetAllInvestmentsByInvestors = (
  investors: GenericLabelValueObject[]
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.investor.investmentsByInvestors(investors),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "all investments by investors",
        }),
        message: parseError(error),
      });
    },
  });
};
