import { HTMLAttributes } from "react";
import { Kind } from "../Heading/props";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Default: 'display' |
   * Specifies which heading kind to render.
   */
  kind?: Exclude<Kind, "subtitle-1" | "subtitle-2">;
}
