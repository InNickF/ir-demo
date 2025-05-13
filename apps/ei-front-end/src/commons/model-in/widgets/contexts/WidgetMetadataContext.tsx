import { createContext } from "react";
import { WidgetMetadata } from "../types";

export const WidgetMetadataContext = createContext<WidgetMetadata>(null);

interface WidgetMetadataProviderProps {
  value: WidgetMetadata;
  children: React.ReactNode;
}
export const WidgetMetadataProvider = ({
  value,
  children,
}: WidgetMetadataProviderProps) => {
  return (
    <WidgetMetadataContext.Provider value={value}>
      {children}
    </WidgetMetadataContext.Provider>
  );
};
