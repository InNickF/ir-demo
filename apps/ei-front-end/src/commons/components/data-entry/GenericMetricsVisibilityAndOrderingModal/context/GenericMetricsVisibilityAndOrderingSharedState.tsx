import { createContext } from "react";
import {
  GenericMetricsVisibilityAndOrderingSharedState,
  ValidMetricsRecord,
} from "..";

export const GenericMetricsVisibilityAndOrderingSharedStateContext =
  createContext(null as GenericMetricsVisibilityAndOrderingSharedState);

interface GenericMetricsVisibilityAndOrderingSharedStateProviderProps<
  T extends ValidMetricsRecord
> {
  defaultValue: GenericMetricsVisibilityAndOrderingSharedState<T>;
  children: React.ReactNode;
}
export const GenericMetricsVisibilityAndOrderingStateProvider = <
  T extends ValidMetricsRecord
>({
  defaultValue,
  children,
}: GenericMetricsVisibilityAndOrderingSharedStateProviderProps<T>) => {
  return (
    <GenericMetricsVisibilityAndOrderingSharedStateContext.Provider
      value={
        defaultValue as unknown as GenericMetricsVisibilityAndOrderingSharedState<ValidMetricsRecord>
      }
    >
      {children}
    </GenericMetricsVisibilityAndOrderingSharedStateContext.Provider>
  );
};
