import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Comp } from "../../typings/market-analytics";
import {
  postLandComp,
  postLeaseComp,
  postSaleComp,
  deleteComp,
  patchComp,
  postComp,
} from "../api/market-analytics";
import { queries } from "../keys";
const {
  subjectErrorCRUD,
  messageUnableToCreate,
  messageUnableToDelete,
  messageUnableToUpdate,
} = notificationMessages;

export const useCreateComp = <T extends Comp>() => {
  const queryClient = useQueryClient();
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: (newComp: T) => postComp(newComp),
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(error, messageUnableToCreate("comp")),
        kind: "error",
      });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: queries.marketAnalytics._def,
      });
    },
  });
};

export const useEditComp = <T extends Comp>() => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: (editComp: T) => patchComp(editComp),
    onError: (error, variables) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "PATCH" }),
        message: parseError(
          error,
          messageUnableToUpdate(`comp: ${variables?.id}`)
        ),
        kind: "error",
      });
    },
  });
};

export const useDeleteComp = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: deleteComp,
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "DELETE" }),
        message: parseError(error, messageUnableToDelete("comp")),
        kind: "error",
      });
    },
  });
};

export const useCreateLeaseComp = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: postLeaseComp,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Lease comp created`,
        message: ` ${variables?.street_address} was created successfully`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(error, messageUnableToCreate(`comp`)),
        kind: "error",
      });
    },
  });
};

export const useCreateLandComp = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: postLandComp,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Land comp created`,
        message: ` ${variables?.street_address} was created successfully`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(error, messageUnableToCreate(`comp`)),
        kind: "error",
      });
    },
  });
};

export const useCreateSaleComp = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useMutation({
    mutationFn: postSaleComp,
    onSuccess: (data, variables) => {
      createNotification({
        subject: `Sale comp created`,
        message: ` ${variables?.street_address} was created successfully`,
        kind: "success",
      });
    },
    onError: (error) => {
      createNotification({
        subject: subjectErrorCRUD({ verb: "POST" }),
        message: parseError(error, messageUnableToCreate(`comp`)),
        kind: "error",
      });
    },
  });
};
