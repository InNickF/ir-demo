import * as am5 from "@amcharts/amcharts5";
import animatedTheme from "@amcharts/amcharts5/themes/Animated";
import darkTheme from "@amcharts/amcharts5/themes/Dark";
import { Theme } from "in-ui-react";
import {
  darkChartColors,
  generateComplementaryColors,
  lightChartColors,
} from "./chart-colors";

/* am5.addLicense(process.env.NEXT_PUBLIC_AMCHARTS_5_KEY);
 */ interface ISetChartTheme {
  theme: Theme;
  root: am5.Root;
  additionalThemes?: am5.Theme[];
  dataLength?: number;
}

/* This assignment is to prevent breaking use in other modules */
const darkColors = darkChartColors;
const lightColors = lightChartColors;

const setChartTheme = ({
  theme,
  root,
  additionalThemes = [],
  dataLength = 21,
}: ISetChartTheme) => {
  const chartTheme = am5.Theme.new(root);
  const baseColors = theme.includes("dark") ? darkColors : lightColors;

  // Generate additional colors if needed
  const colors =
    dataLength <= baseColors.length
      ? baseColors
      : [...generateComplementaryColors({ baseColors, numColors: dataLength })];

  chartTheme.rule("ColorSet").set(
    "colors",
    colors.map((color) => am5.color(color))
  );

  const chartThemes: am5.Theme[] = [
    animatedTheme.new(root),
    chartTheme,
    ...additionalThemes,
  ];
  theme.includes("dark") && chartThemes.push(darkTheme.new(root));

  root.setThemes(chartThemes);
};

interface ISetTooltip {
  labelText?: string;
  theme: Theme;
  root: am5.Root;
  args?: Record<string, string | number>;
}

export const setTooltip = ({
  labelText = "{categoryX}: {valueY}",
  theme,
  root,
  args = {},
}: ISetTooltip) => {
  const tooltip = am5.Tooltip.new(root, {
    labelText: labelText,
    getFillFromSprite: false,
    autoTextColor: false,
    tooltipY: am5.percent(0),
    ...args,
  });
  tooltip.label.setAll({
    fill: am5.color(theme.includes("dark") ? "#333333" : "#ffffff"),
  });
  tooltip.get("background").setAll({
    fill: am5.color(theme.includes("dark") ? "#ffffff" : "#333333"),
    fillOpacity: 0.8,
  });
  return tooltip;
};

export { lightColors, darkColors, setChartTheme };
export default am5;
