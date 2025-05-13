import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getInvestorReport } from "../api/investor";

export const useMutateGetInvestorReport = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: getInvestorReport,
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
