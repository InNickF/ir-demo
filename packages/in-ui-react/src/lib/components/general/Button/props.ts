import {
  AsElement,
  Color,
  PolymorphicComponentPropWithRef,
  Size,
} from "../../utils/types";
import { IconProps } from "../Icon/props";

export type Kind = "decorated" | "solid" | "outline" | "ghost";
export type IconPosition = "right" | "left";

export type ButtonProps<C extends AsElement> = PolymorphicComponentPropWithRef<
  C,
  {
    /**
     * Default: 'decorated' |
     * Specifies design style button with a string.
     */
    kind?: Kind;
    /**
     * Default: 'primary' |
     * Specifies button color with a string.
     */
    color?: Color;
    /**
     * Default: 'normal' |
     * Specifies the button size with a string.
     */
    size?: Size;
    /**
     *Default: false |
     * Makes the button use all available horizontal space.
     */
    block?: boolean;
    /**
     * Default: false |
     * This prop sets the disable html attr as true.
     */
    disabled?: boolean;
    /**
     * Default: false |
     * Specifies if the button has initiated an action and must wait for it (this prop automatically sets the disable html attribute as true).
     */
    loading?: boolean;
    /**
     * Default: false |
     * Specifies if the button is squared.
     */
    squared?: boolean;
    /**
     * Default: null |
     * You can use this props to send a string with you custom css classes.
     */
    className?: string;
    /**
     * Default: null |
     * Send the inUI icon name, this button will manage it.
     */
    icon?: IconProps["svg"];
    /**
     * Default: false |
     * Specifies if the button will only show the icon and not the children react prop, the icon prop must be already set for this action.
     */
    onlyIcon?: boolean;
    /**
     * Default: 'left' |
     * Specifies the icon position in the button, it could be 'right' or 'left'.
     */
    iconPosition?: IconPosition;
    /**
     * Default: 'Icon' |
     * Specifies the icon title in the button.
     */
    iconTitle?: string;
    /**
     * Default: false |
     * Specifies text alignment in the button.
     */
    textLeft?: boolean;
  }
>;
