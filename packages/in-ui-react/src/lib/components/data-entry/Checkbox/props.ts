import { InputHTMLAttributes } from "react";
import { CheckboxOptions } from "reakit/ts";
import { TooltipProps } from "../../feedback/Tooltip/props";
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value">,
    CheckboxOptions {
  /**
   * Default: undefined |
   * Label text
   */
  label?: string;
  /**
   * Default: undefined |
   * Error message.
   */
  error?: string | false | undefined;
  /*
   * Default: undefined |
   * Label tooltip content (string | JSX.Element).
   */
  tooltip?: TooltipProps["content"];
}
