import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  getPropertyValidationsRulesExport,
  postTriggerDAGNotification,
} from "../api/property-level-validations";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { downloadExcelFileFromAPIResponse } from "@/commons/services/api/downloadExcelFileFromAPIResponse";

export const useMutateDownloadPropertyValidations = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: getPropertyValidationsRulesExport,
    onSuccess: (data, variables) => {
      downloadExcelFileFromAPIResponse({
        data,
        fileName: variables?.fileName,
      });

      createNotification({
        subject: "Property Validation Rules",
        message: `File "${variables?.fileName}" successfully exported`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: `Error Exporting Property Validation Rules`,
        message: parseError(
          error,
          `Unable to export file. Please try again later."`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateTriggerDAGNotification = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postTriggerDAGNotification,
    onSuccess: () => {
      createNotification({
        subject: "Rules re-run has been successfully triggered",
        message: "You will be notified by email once it has finished running.",
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: `Error re-running rules`,
        message: parseError(
          error,
          `Unable to re-run rules. Please try again later."`
        ),
        kind: "error",
      });
    },
  });
};
