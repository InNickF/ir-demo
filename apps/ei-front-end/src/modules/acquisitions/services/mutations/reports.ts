import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  getEquityRequirementsReport,
  getMarketAnalyticsPageDataReports,
} from "../api/reports";

export const useMutateGetEquityRequirementReports = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: getEquityRequirementsReport,
    onError: (error) => {
      createNotification({
        subject: `Error downloading report`,
        message: parseError(
          error,
          `Unable to download report. Please try again later."`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateGetMarketAnalyticsPageDataReports = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: getMarketAnalyticsPageDataReports,
    onError: (error) => {
      createNotification({
        subject: `Error downloading report`,
        message: parseError(
          error,
          `Unable to download report. Please try again later."`
        ),
        kind: "error",
      });
    },
  });
};
