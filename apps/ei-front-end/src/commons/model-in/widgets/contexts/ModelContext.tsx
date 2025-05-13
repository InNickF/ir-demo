import { createContext } from "react";
import { z } from "zod";
import { Formatter } from "../../formatters/types";
import { IdAndLabels, ModelSchema } from "../../types";

export interface UseModelContextValue<TModelSchema extends ModelSchema>
  extends IdAndLabels {
  formatter: Formatter<z.infer<TModelSchema>>;
  schema: TModelSchema;
}

export const ModelContext =
  createContext<UseModelContextValue<z.AnyZodObject>>(null);

interface ModelProviderProps<TModelSchema extends ModelSchema> {
  value: UseModelContextValue<TModelSchema>;
  children: React.ReactNode;
}
export const ModelProvider = <TModelSchema extends ModelSchema>({
  value,
  children,
}: ModelProviderProps<TModelSchema>) => {
  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
};
