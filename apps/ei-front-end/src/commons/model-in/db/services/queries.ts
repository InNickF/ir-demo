import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { deepRemoveDefaults } from "@/commons/utils/schemas";
import { createUUID } from "@/commons/utils/uuid";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { ConfigSettingsSchema, SetSettings } from "../../configs/types";
import { ConfigQueryReturn, ConfigsQueryReturn, Configuration } from "../types";
import { parseStringSettingsToObject } from "../utils";
import { queries } from "./keys";
import { useMutationCreateConfig, useMutationUpdateConfig } from "./mutations";

export interface UseFindOrCreateWidgetConfigParams<
  TSettings extends ConfigSettingsSchema
> {
  configSchema: TSettings;
  filters: Partial<Omit<Configuration<TSettings>, "settings">>;
}
export const useFindOrCreateWidgetConfig = <
  T extends ConfigSettingsSchema = ConfigSettingsSchema
>({
  configSchema,
  filters,
}: UseFindOrCreateWidgetConfigParams<T>): ConfigQueryReturn<T> => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const createMutation = useMutationCreateConfig();
  const updateMutation = useMutationUpdateConfig();
  const memoFilters = useMemo(() => cleanEmptyObjectValues(filters), [filters]);

  const queryFnAndKey = useMemo(
    () =>
      queries.config.configurations({
        filters: memoFilters,
      }),
    [memoFilters]
  );

  const query = useQuery<
    unknown,
    unknown,
    Configuration<typeof configSchema>[]
  >({
    ...queryFnAndKey,
    keepPreviousData: true,
    onSuccess: (data) => {
      const config = data?.[0];
      // If there is no data, create a new config
      if (!config || !config?.settings) {
        createMutation.mutate({
          config: {
            ...memoFilters,
            settings: JSON.stringify(
              configSchema?.parse({}) || {}
            ) as unknown as z.infer<typeof configSchema>,
            id: memoFilters?.id || createUUID(),
          },
          filters: cleanEmptyObjectValues(memoFilters),
        });
      }

      // Check if the config is valid and if not, update it
      if (config && config?.settings) {
        const parsed = deepRemoveDefaults(configSchema).safeParse(
          parseStringSettingsToObject(config)?.settings
        );
        if (!parsed.success) {
          updateMutation.mutate({
            config: {
              ...memoFilters,
              settings: JSON.stringify(
                configSchema?.parse({}) || {}
              ) as unknown as z.infer<typeof configSchema>,
              id: config?.id,
            },
            filters: cleanEmptyObjectValues(memoFilters),
          });
        }
      }
    },
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Widget Config",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!memoFilters?.id ||
      (!!memoFilters?.widget &&
        !!memoFilters?.model &&
        !!memoFilters?.entity &&
        !!memoFilters?.module &&
        !!memoFilters?.view),
  });

  const setSettings: SetSettings<T> = useCallback(
    (settings) => {
      const newSettings =
        typeof settings === "function"
          ? settings(query?.data?.[0]?.settings as T)
          : settings;

      updateMutation.mutate({
        config: {
          ...memoFilters,
          settings: JSON.stringify(
            configSchema?.parse(newSettings) || {}
          ) as unknown as z.infer<typeof configSchema>,
          id: filters?.id || query?.data?.[0]?.id,
        },
        filters: cleanEmptyObjectValues(memoFilters),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [memoFilters, configSchema]
  );

  const memoizedData: Configuration<T> = useMemo(() => {
    const queryData = query.data?.[0];
    const { success } = deepRemoveDefaults(
      configSchema || z.object({})
    ).safeParse(parseStringSettingsToObject(queryData)?.settings);
    if (queryData && success) {
      return parseStringSettingsToObject(queryData);
    }
    return null;
  }, [query.data, configSchema]);

  return {
    query: { ...query, data: memoizedData },
    queryKey: [...queryFnAndKey.queryKey],
    setSettings: setSettings,
  } as ConfigQueryReturn<T>;
};

export interface UseFindConfigsParams {
  filters: Partial<Omit<Configuration, "settings">>;
}
export const useFindConfigs = ({
  filters,
}: UseFindConfigsParams): ConfigsQueryReturn => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const memoFilters = useMemo(() => cleanEmptyObjectValues(filters), [filters]);

  const queryFnAndKey = useMemo(
    () =>
      queries.config.configurations({
        filters: memoFilters,
      }),
    [memoFilters]
  );

  const query = useQuery({
    ...queryFnAndKey,
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Widget Config",
        }),
        message: parseError(error),
      });
    },
  });

  return {
    query: { ...query },
    queryKey: [...queryFnAndKey.queryKey],
  };
};
