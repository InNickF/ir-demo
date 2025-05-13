import { HTMLAttributes } from "react";
import { Theme } from "../../../hooks/useTheme";
import { Size } from "../../utils/types";

export type LogoName =
  | "ei"
  | "Acquisitions"
  | "Debt"
  | "Development"
  | "Assets"
  | "Sight";
export interface LogoProps extends HTMLAttributes<HTMLOrSVGElement> {
  /**
   * Default: "ei"
   * Specifies the svg logo.
   */
  name?: LogoName;
  /**
   * Default: "dark" |
   * Specifies the svg fill color with a string.
   */
  theme?: Theme;
  /**
   * Default: 'normal' |
   * Specifies the logo size with a string.
   */
  size?: Size;
}
