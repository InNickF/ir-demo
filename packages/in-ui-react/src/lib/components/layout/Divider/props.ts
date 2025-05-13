import { HTMLAttributes } from "react";

export interface DividerProps
  extends Omit<HTMLAttributes<HTMLHRElement>, "children"> {
  /**
   * Default: horizontal |
   * Specifies the divider orientation.
   */
  orientation?: "horizontal" | "vertical";
}
