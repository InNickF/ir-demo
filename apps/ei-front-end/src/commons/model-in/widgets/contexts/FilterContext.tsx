import { createContext } from "react";
import { UseResourceFiltersReturn } from "../../resources/filters/hooks";
import { FilterSchema } from "../../types";

export type UseFiltersContextValue<TFilterSchema extends FilterSchema> =
  UseResourceFiltersReturn<TFilterSchema>;

export const FiltersContext =
  createContext<UseFiltersContextValue<FilterSchema> | null>(null);

interface FiltersProviderProps<TLocalFilter extends FilterSchema> {
  value: UseFiltersContextValue<TLocalFilter>;
  children: React.ReactNode;
}

export const FiltersProvider = <TLocalFilter extends FilterSchema>({
  value,
  children,
}: FiltersProviderProps<TLocalFilter>) => {
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
