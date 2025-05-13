import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { postExcelData, postLoanAbstractData } from "../api/tools";

export const useMutatePushRentRollOrCashflowData = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postExcelData,
    onSuccess: (data) => {
      createNotification({
        kind: "success",
        subject: "File uploaded correctly",
        message: `${data?.fileType} uploaded successfully`,
      });
    },
    onError: (error) => {
      createNotification({
        subject: `Error uploading report`,
        message: parseError(
          error,
          `Unable to upload report. Please try again later."`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostLoanAbstract = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postLoanAbstractData,
    onSuccess: (data, variables) => {
      createNotification({
        subject: "Loan abstract data uploaded",
        message: `Information added for property "${variables?.scode}"`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: `Error uploading file`,
        message: parseError(
          error,
          `Unable to upload file. Please try again later."`
        ),
        kind: "error",
      });
    },
  });
};
