import { InputHTMLAttributes } from "react";
import { RadioOptions } from "reakit/ts";
import { TooltipProps } from "../../feedback/Tooltip/props";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Default: undefined |
   * Label text
   */
  label: string;
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
