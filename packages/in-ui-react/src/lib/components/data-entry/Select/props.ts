import { GroupBase, Props } from "react-select";
import { TooltipProps } from "../../feedback/Tooltip/props";
import { IconProps } from "../../general/Icon/props";
import { InputsColor } from "../../utils/types";

export interface SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
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
   * Shot text to show on hover/focus under input. (HelperText component)
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
  icon?: IconProps["svg"];
  /**
   * Default: undefined |
   * Specifies left icon title for accessibility
   */
  iconTitle?: string;
  disabled?: boolean;
  /**
   * Default: undefined |
   * Specifies select container color.
   */
  color?: InputsColor;
  /**
   * Default: "default" |
   * Specifies input container color.
   */
  loading?: boolean;
  /**
   * Default: undefined |
   * Specifies if select is required.
   */
  required?: boolean;
  /**
   * Default: false |
   * Specifies if select is creatable.
   */
  isCreatable?: boolean;
}
