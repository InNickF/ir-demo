import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { createConfig, updateConfig } from "./api";
import { queries } from "./keys";

export const useMutationCreateConfig = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConfig,
    onMutate: async ({ config, filters }) => {
      await queryClient.cancelQueries(
        queries.config.configurations({ filters }).queryKey
      );
      const previousValue = queryClient.getQueryData(
        queries.config.configurations({ filters }).queryKey
      );
      queryClient.setQueryData(
        queries.config.configurations({ filters }).queryKey,
        [config]
      );
      return { previousValue, filters };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        queries.config.configurations({ filters: context.filters }).queryKey,
        context.previousValue
      );
      createNotification({
        subject: `Error while creating widget config`,
        message: parseError(error, `Error while creating widget config`),
        kind: "error",
      });
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries(
        queries.config.configurations({ filters: context.filters }).queryKey
      );
    },
  });
};

export const useMutationUpdateConfig = () => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateConfig,
    onMutate: async ({ config, filters }) => {
      // Optimistically update the cache
      await queryClient.cancelQueries(
        queries.config.configurations({ filters }).queryKey
      );
      const previousValue = queryClient.getQueryData(
        queries.config.configurations({ filters }).queryKey
      );
      queryClient.setQueryData(
        queries.config.configurations({ filters }).queryKey,
        [config]
      );
      return { previousValue, filters };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        queries.config.configurations({ filters: context.filters }).queryKey,
        context.previousValue
      );
      createNotification({
        subject: `Error while updating widget config`,
        message: parseError(error, `Error while updating widget config`),
        kind: "error",
      });
    },
  });
};
