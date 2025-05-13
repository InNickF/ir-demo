import { SVGProps } from "react";
import { AboveColor, Color, Size } from "../../utils/types";

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Required |
   * Specifies the icon.
   */
  svg: JSX.Element;
  /**
   * Default: 'currentColor' |
   * Specifies the icon style color with a string.
   */
  color?: Color | AboveColor;
  /**
   * Default: 'normal' |
   * Specifies the icon size between small, normal and big.
   */
  size?: Size;
  /**
   * Default: null |
   * Specifies the icon size a string Ex: 200px || 10% || 5rem || 2em.
   */
  specificSize?: string;
  /**
   * Default: false |
   * Specifies if the icon will be a hover effect.
   */
  hoverTransition?: boolean;
}
