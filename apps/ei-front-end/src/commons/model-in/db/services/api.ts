import { createUUID } from "@/commons/utils/uuid";
import db from "..";
import { Configuration } from "../types";

export interface GetConfigParams {
  filters: Partial<Omit<Configuration, "settings">>;
}
export const getConfigs = async ({
  filters,
}: GetConfigParams): Promise<Configuration[]> => {
  const configurations =
    ((await db.configurations.where(filters).toArray()) as Configuration[]) ||
    [];
  return configurations;
};

export interface createConfigParams {
  config: Configuration;
  filters?: GetConfigParams["filters"];
}
export const createConfig = async ({
  config,
}: createConfigParams): Promise<Configuration> => {
  const id = config?.id || createUUID();
  const newConfig = {
    ...config,
    id,
  };
  await db.configurations.add(newConfig);

  return newConfig;
};

export interface updateConfigParams {
  config: Configuration;
  filters?: GetConfigParams["filters"];
}
export const updateConfig = async ({
  config,
}: updateConfigParams): Promise<Configuration> => {
  await db.configurations.update(config.id, config);
  return config;
};

/**
 * END Widgets
 */
