import { HTMLAttributes } from "react";
import { AboveColor, Color, Size } from "../../utils/types";

export interface LoadingLineProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Default: 'primary' |
   * Specifies the loader style color with a string.
   */
  color?: Color | AboveColor;
  /**
   * Default: 'normal' |
   * Specifies the loader size with a string.
   */
  size?: Size;
  /**
   * Default: 'default' |
   * Specifies the loader velocity with a string.
   */
  velocity?: "default" | "fast" | "slow";
  /**
   * Default: false |
   * Render a span element to keep loading size on DOM.
   */
  persist?: boolean;
  /**
   * Default: true |
   * To render the line animation.
   */
  isActive?: boolean;
}
