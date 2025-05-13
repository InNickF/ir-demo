import { HTMLAttributes } from "react";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Default: "none" |
   * Specifies the padding of each horizontal side
   */
  paddingX?: "left" | "right" | "both" | "none";
}
