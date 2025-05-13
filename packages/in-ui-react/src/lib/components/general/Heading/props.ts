import { HTMLAttributes } from "react";

export type Kind =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle-1"
  | "subtitle-2"
  | "display"
  | "sub-display";

export interface HeadingKind extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Default: 'display' |
   * Specifies which heading kind to render.
   */
  kind?: Kind;
  /**
   * Default: 'false' |
   * Specifies if heading will be rendered with sans family.
   */
  sans?: boolean;
}
