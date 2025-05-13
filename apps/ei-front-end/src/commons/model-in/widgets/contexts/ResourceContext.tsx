import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";
import { z } from "zod";
import { DataResolverSchema, SharedFilterSchema } from "../../types";

export interface UseResourceContextValue<
  TData extends DataResolverSchema = DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema = SharedFilterSchema
> {
  schema: TData;
  query: UseQueryResult<z.infer<TData>>;
  queryKey: unknown[];
  appliedFilters: z.infer<TSharedFilterSchema>;
}

export const ResourceContext = createContext<UseResourceContextValue>(null);

interface ResourceProviderProps<
  TData extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema
> {
  value: UseResourceContextValue<TData, TSharedFilterSchema>;
  children: React.ReactNode;
}
export const ResourceProvider = <
  TData extends DataResolverSchema,
  TSharedFilterSchema extends SharedFilterSchema
>({
  value,
  children,
}: ResourceProviderProps<TData, TSharedFilterSchema>) => {
  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};
