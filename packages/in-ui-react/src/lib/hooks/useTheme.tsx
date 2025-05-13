import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * In UI themes
 */
export const themes = [
  "Default-light",
  "Default-dark",
  "Minimal-light",
  "Minimal-dark",
] as const;
export type Theme = typeof themes[number];

export type ThemeStore = {
  /**
   * Theme state, must be some theme after first render before that always will be null.
   */
  getTheme: () => Theme;
  /**
   * Change theme to opposite value if theme state is "light" will be "dark" and if theme state is "dark" will be "light"
   */
  toggleTheme: () => void;
  /**
   * Change theme to the next theme in the list.
   */
  setNextTheme: () => void;
  /**
   * Change theme to specific value.
   */
  changeThemeTo: (theme: Theme) => void;
  /**
   * Subscriber to store function.
   */
  subscribe: (callback: () => void) => () => void;
};

export const useThemeStore = (): ThemeStore => {
  const theme = useRef<Theme>("Default-light");
  const getTheme = useCallback(() => theme.current, []) as () => Theme;
  const subscribers = useRef(new Set<() => void>());

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  const set = useCallback((newTheme: Theme) => {
    theme.current = newTheme;
    subscribers.current.forEach((callback) => callback());
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = getTheme().includes("dark")
      ? (getTheme().replace("dark", "light") as Theme)
      : (getTheme().replace("light", "dark") as Theme);
    set(newTheme);
    changeThemeInDOM(newTheme);
  }, []);

  const setNextTheme = useCallback(() => {
    const currentThemeIndex = themes.indexOf(getTheme());
    const nextThemeIndex =
      currentThemeIndex === themes.length - 1 ? 0 : currentThemeIndex + 1;
    const nextTheme = themes[nextThemeIndex];
    set(nextTheme);
    changeThemeInDOM(nextTheme);
  }, []);

  const changeThemeTo = useCallback((theme: Theme) => {
    set(theme);
    changeThemeInDOM(theme);
  }, []);

  const changeThemeInDOM = (theme: Theme) => {
    document.body.setAttribute("data-theme", theme.toLocaleLowerCase());
    localStorage.inUITheme = theme;

    // IOS re painting bug on no layout css changes
    document.body.style.translate = "0px";
    setTimeout(() => {
      document.body.style.removeProperty("translate");
    }, 0);
  };

  const setThemeOnMount = () => {
    if (localStorage.inUITheme) {
      changeThemeTo(localStorage.inUITheme);
    }
    if (
      !("inUITheme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      changeThemeTo("Default-dark");
    }
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender) {
      setThemeOnMount();
      isFirstRender.current = false;
    }
  }, []);

  return {
    getTheme,
    toggleTheme,
    changeThemeTo,
    subscribe,
    setNextTheme,
  };
};

const useTheme = (): { theme: Theme } & Omit<
  ThemeStore,
  "getTheme" | "subscribe"
> => {
  const themeStore = useContext(ThemeContext);
  if (!themeStore) {
    throw new Error("useTheme says: Theme context not found!");
  }

  const [theme, setTheme] = useState(themeStore.getTheme());
  useEffect(() => {
    return themeStore.subscribe(() => setTheme(themeStore.getTheme()));
  }, []);

  const { changeThemeTo, toggleTheme, setNextTheme } = themeStore;
  return {
    theme,
    changeThemeTo,
    toggleTheme,
    setNextTheme,
  };
};

export default useTheme;
