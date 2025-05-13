import { maps } from "@/commons/utils";
import { useTheme } from "in-ui-react";
import {
  MapboxStyleDefinition,
  MapboxStyleSwitcherControl,
  MapboxStyleSwitcherOptions,
} from "mapbox-gl-style-switcher";
import { useEffect, useMemo, useState } from "react";
import { useControl } from "react-map-gl";

export interface UseMapStylesArgs {
  stylesMap?: MapboxStyleDefinition[];
  optionsSwitchControl?: MapboxStyleSwitcherOptions;
}

export const useMapStyles = (
  { stylesMap, optionsSwitchControl }: UseMapStylesArgs = {
    stylesMap: null,
    optionsSwitchControl: null,
  }
) => {
  const { theme } = useTheme();
  const style = useMemo(
    () =>
      theme.includes("dark")
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
    [theme]
  );

  const styles = useMemo(
    () => (stylesMap !== null ? stylesMap : maps?.DEFAULT_STYLES_MAP),
    [stylesMap]
  );

  const [defaultOptionStyle, setDefaultOptionStyle] =
    useState<MapboxStyleSwitcherOptions>(optionsSwitchControl || null);

  function MapboxSwitcherControl(props) {
    useControl<MapboxStyleSwitcherControl>(
      () => new MapboxStyleSwitcherControl(props.styles, props.options),
      { position: "bottom-right" }
    );

    return null;
  }

  const MemoMapboxSwitcherControl = useMemo(() => MapboxSwitcherControl, []);

  useEffect(() => {
    const style = theme?.includes("dark") ? "Dark" : "Light";
    setDefaultOptionStyle((prev) => ({ ...prev, defaultStyle: style }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    style,
    styles,
    defaultOptionStyle,
    MemoMapboxSwitcherControl,
    theme,
  };
};
