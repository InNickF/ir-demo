import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";
import { Preset } from "../../configs/presets/types";
import { ConfigComponent, ConfigSettingsSchema } from "../../configs/types";
import { ConfigQueryReturn, Configuration } from "../../db/types";

export interface UseConfigContextValue<TSchema extends ConfigSettingsSchema> {
  schema: TSchema;
  presets: Preset<TSchema>[];
  Component: ConfigComponent<TSchema>;
  query: UseQueryResult<Configuration<TSchema> | null, unknown>;
  queryKey: unknown[];
  setSettings: ConfigQueryReturn<TSchema>["setSettings"];
}

export const ConfigContext =
  createContext<UseConfigContextValue<ConfigSettingsSchema> | null>(null);

interface ConfigProviderProps<TSchema extends ConfigSettingsSchema> {
  value: UseConfigContextValue<TSchema>;
  children: React.ReactNode;
}
export const ConfigProvider = <TSchema extends ConfigSettingsSchema>({
  value,
  children,
}: ConfigProviderProps<TSchema>) => {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
