import { createContext, FC, PropsWithChildren } from "react";
import { useThemeStore } from "../hooks/useTheme";

export type useThemeReturnType = ReturnType<typeof useThemeStore>;
export const ThemeContext = createContext<useThemeReturnType>(null!);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useThemeStore();
  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
};
