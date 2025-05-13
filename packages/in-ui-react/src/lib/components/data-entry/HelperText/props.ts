import { HTMLAttributes, ReactNode } from "react";
import { Color } from "../../utils/types";

export interface HelperTextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /**
   * Default: 'currentColor'
   * Specifies the icon style color with a string.
   */
  color?: Color;
}
