import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  deletePropertyAttachment,
  deletePropertyTimeline,
  patchPropertyComments,
  patchPropertyStrategy,
  patchPropertyTimeline,
  postPropertyAttachments,
  postPropertyComments,
  postPropertyStrategy,
  postPropertyTimeline,
} from "../api/properties";

export const useMutatePostPropertyStrategy = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postPropertyStrategy,
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing property strategy.`,
        message: parseError(
          error,
          `Unable to update ${variables?.type} strategy for "${variables?.property_under_management_code}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostPropertyComments = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postPropertyComments,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Property Comments Saved Successfully.`,
        message: `Has been applied to "${variables?.property_under_management_code}"`,
        kind: "success",
      });
    },
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing property comments.`,
        message: parseError(
          error,
          `Unable to update comments for "${variables?.property_under_management_code}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchPropertyStrategy = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchPropertyStrategy,
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing property strategy.`,
        message: parseError(
          error,
          `Unable to update strategy for "${variables?.id}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchPropertyComments = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchPropertyComments,
    onError: (error, variables) => {
      createNotification({
        subject: `Error editing property comments.`,
        message: parseError(
          error,
          `Unable to update comments for "${variables?.id}"`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostPropertyTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postPropertyTimeline,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Creating Critical Date.`,
        message: parseError(
          error,
          `Unable to create date for ${variables?.property_under_management_code}`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePatchPropertyTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: patchPropertyTimeline,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Editing Critical Date.`,
        message: parseError(
          error,
          `Unable to update date for ${variables?.property_under_management_code}`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateDeletePropertyTimeline = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deletePropertyTimeline,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Deleting Critical Date.`,
        message: parseError(
          error,
          `Unable to delete date for ${variables?.property_under_management_code}`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutatePostPropertyAttachments = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postPropertyAttachments,
    onError: (error, variables) => {
      createNotification({
        subject: `Error uploading attachments.`,
        message: parseError(
          error,
          `Unable to upload attachments for ${variables?.property_under_management_code}`
        ),
        kind: "error",
      });
    },
  });
};

export const useMutateDeletePropertyAttachment = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: deletePropertyAttachment,
    onError: (error, variables) => {
      createNotification({
        subject: `Error Deleting Attachment.`,
        message: parseError(
          error,
          `Unable to delete attachment for ${variables?.property_under_management_code}`
        ),
        kind: "error",
      });
    },
  });
};
