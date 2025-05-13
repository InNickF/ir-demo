import { TextareaHTMLAttributes, ReactNode } from "react";
import { IconProps } from "../../general/Icon/props";
import { TooltipProps } from "../../feedback/Tooltip/props";
import { InputsColor } from "../../utils/types";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode;
  /**
   * Default: undefined |
   * Specifies label text.
   */
  label?: string;
  /**
   * Default: undefined |
   * Label tooltip content (string | JSX.Element).
   */
  tooltip?: TooltipProps["content"];
  /**
   * Default: undefined |
   * Shot text to show on hover/focus under textarea. (HelperText component)
   */
  hint?: string;
  /**
   * Default: undefined |
   * Error message.
   */
  error?: string | false | undefined;
  /**
   * Default: undefined |
   * Left icon name to render it.
   */
  leftIcon?: IconProps["svg"];
  /**
   * Default: undefined |
   * Reft icon name to render it.
   */
  rightIcon?: IconProps["svg"];
  /**
   * Default: undefined |
   * Specifies left icon on click action
   */
  leftIconAction?: () => void;
  /**
   * Default: undefined |
   * Specifies right icon on click action
   */
  rightIconAction?: () => void;
  /**
   * Default: undefined |
   * Specifies textarea container color.
   */
  color?: InputsColor;
  /**
   * Default: "default" |
   * Specifies input container color.
   */
  loading?: boolean;
}
