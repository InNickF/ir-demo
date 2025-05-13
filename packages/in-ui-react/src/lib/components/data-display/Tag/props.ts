import { HTMLAttributes, ReactNode } from "react";
import { Color, Size } from "../../utils/types";
import { IconProps } from "../../general/Icon/props";
import { IconPosition } from "../../general/Button/props";

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: 'primary' |
   * Specifies tag color with a string.
   */
  color?: Color;
  /**
   * Default: "primary" |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
  /**
   * Default: null |
   * You can use this prop to send a function event to the tag.
   */
  action?: (id?: string) => void;
  /**
   * Default: "x-mark" |
   * Send the inUI icon name, this button will manage it.
   */
  icon?: IconProps["svg"];
  children?: ReactNode;
  /**
   * Default: 'normal' |
   * Specifies the tag size with a string.
   */
  size?: Size;
  /**
   * Default: 'left' |
   * Specifies the icon position in the tag, it could be 'right' or 'left'.
   */
  iconPosition?: IconPosition;
  /**
   * Specifies the tag content.
   */
  text: string;
  /**
   * Specifies the slice condition length.
   */
  textSliceLength?: number;
  /**
   * Turn tag into a circle
   */
  circle?: boolean;
}
