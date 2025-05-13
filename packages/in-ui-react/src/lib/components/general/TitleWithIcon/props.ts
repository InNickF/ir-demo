import { HTMLAttributes, ReactNode } from "react";
import { Kind } from "../Heading/props";
import { IconProps } from "../Icon/props";

export interface TitleWithIconProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specifies the icon to be shown
   */
  icon: IconProps["svg"];
  /**
   * The classic React children prop.
   */
  children: ReactNode;
  /**
   * Default: 'h5' |
   * Specifies which heading kind to render.
   */
  kind?: Kind;
}
