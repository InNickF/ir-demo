import { LabelHTMLAttributes } from "react";
import { TooltipProps } from "../../feedback/Tooltip/props";
import { IconProps } from "../../general/Icon/props";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /*
   * Default: undefined |
   * Label tooltip content (string | JSX.Element).
   */
  tooltip?: TooltipProps["content"];
  /*
   * Default: "information-circle" |
   * Tooltip icon
   */
  icon?: IconProps["svg"];
  /*
   * Default: true |
   * Makes the label uppercase
   */
  uppercase?: boolean;
  /*
   * Default: false |
   * Input required prop used to show an asterisk suffix to the label
   */
  required?: boolean;
}
