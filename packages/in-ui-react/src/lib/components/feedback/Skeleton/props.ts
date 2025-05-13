import { ReactNode, HTMLAttributes } from "react";
import { SkeletonWrapper } from ".";
import { SkeletonAvatar } from "./components/Avatar";
import { SkeletonText } from "./components/Text";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: true |
   * Set the skeleton animation
   */
  loading?: boolean;
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
}

export interface SkeletonAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Default: 'circle' |
   * Specifies the quantity of paragraphs to render.
   */
  shape?: "circle" | "squared";
  /**
   * Default: 'medium' |
   * Specifies the quantity of paragraphs to render.
   */
  size?: "big" | "medium" | "small";
}

export interface SkeletonTextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Default: '1' |
   * Specifies quantity of elements to render.
   */
  rows?: number;

  /**
   * Default: 'paragraph' |
   * Specifies kind of element to render.
   */
  kind?: "title" | "subtitle" | "paragraph";
  /**
   * Default: false |
   * Specifies the last item width.
   */
  lastHalf?: boolean;
}

export type SkeletonGroupType = typeof SkeletonWrapper & {
  Avatar: typeof SkeletonAvatar;
  Text: typeof SkeletonText;
};
