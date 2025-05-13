import { HTMLAttributes } from "react";

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The classic React children prop.
   */
  children?: React.ReactNode;
  /**
   * Default: true |
   * Create component using portal API.
   */
  portal?: boolean;
  /**
   * Default: true |
   * Create component using portal API.
   */
  behindNavigation?: boolean;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}
