import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  deleteFundTimeline,
  patchFundTimeline,
  postFundComments,
  postFundStrategy,
  postFundTimeline,
} from "../api/funds";

export const useMutatePostFundStrategy = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postFundStrategy,
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing fund strategy.`,
        message: parseError(
          error,
          `Unable to update ${variables?.type} strategy for "${variables?.fund_name}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostFundComments = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postFundComments,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Property Comments Saved Successfully.`,
        message: `Has been applied to "${variables?.fund_name}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing property comments.`,
        message: parseError(
          error,
          `Unable to update comments for "${variables?.fund_name}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostFundTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postFundTimeline,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Creating Critical Date.`,
        message: parseError(
          error,
          `Unable to create date for ${variables?.fund_name}`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchFundTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchFundTimeline,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Editing Critical Date.`,
        message: parseError(
          error,
          `Unable to update date for ${variables?.fund_name}`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateDeleteFundTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deleteFundTimeline,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Deleting Critical Date.`,
        message: parseError(
          error,
          `Unable to delete date for ${variables?.fund_name}`
        ),
        kind: "error",
      });
    },
  });
};
