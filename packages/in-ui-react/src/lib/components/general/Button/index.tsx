import { FC, PropsWithChildren, forwardRef, useMemo } from "react";

import {
  AboveColor,
  Color,
  AsElement,
  PolymorphicRef,
} from "../../utils/types";
import { Loader } from "../../feedback/Loader";
import { Icon } from "../Icon";
import { Button as RkButton } from "reakit/Button";
import { ButtonProps } from "./props";

import "./styles.css";

/**
 * In UI Button Component
 * @see {@link https://todo.com/} for official documentation.
 * @param as
 * Default: undefined |
 * Specifies render element, can be a html type or component type
 * @param kind
 * Default: 'decorated' |
 * Specifies design style button.
 * @param color
 * Default: 'primary' |
 * Specifies button color.
 * @param size
 * Default: 'normal' |
 * Specifies the button size.
 * @param block
 * Default: false |
 * Makes the button use all available horizontal space.
 * @param disabled
 * Default: false |
 * This prop sets the disable html attr as true.
 * @param loading
 * Default: false |
 * Specifies if the button has initiated an action and must wait for it (this prop automatically sets the disable html attribute as true).
 * @param squared
 * Default: false |
 * Specifies if the button is squared.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @param icon
 * Default: null |
 * Send the inUI icon component without any prop, this button will manage it.
 * @param onlyIcon
 * Default: false |
 * Specifies if the button will only show the icon and not the children react prop, the icon prop must be already set for this action.
 * @param iconPosition
 * Default: 'left' |
 * Specifies the icon position in the button, it could be 'right' or 'left'.
 * @param iconTitle
 * Default: 'Icon' |
 * Specifies the icon title in the button.
 * @returns
 * A inUI button react component
 */

type ButtonComponent = <C extends AsElement = "button">(
  props: ButtonProps<C>
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(function Button<
  C extends AsElement
>(
  {
    kind = "decorated",
    color = "primary",
    size = "normal",
    block = false,
    disabled = false,
    loading = false,
    squared = false,
    textLeft = false,
    as,
    className,
    children,
    icon,
    onlyIcon = false,
    iconPosition = "left",
    iconTitle,
    ...props
  }: ButtonProps<C>,
  ref?: PolymorphicRef<C>
) {
  const Btn = as && as === "button" ? RkButton : as || RkButton;
  const prefix = "in-ui-button";

  const getClasses = (): string => {
    const classes: string[] = [
      `${prefix}`,
      `${prefix}--${color}`,
      `${prefix}--${size}-size`,
      `${prefix}--${kind}-kind`,
    ];

    block && classes.push(`${prefix}--block`);
    textLeft && classes.push(`${prefix}--text-left`);
    icon && classes.push(`${prefix}--${iconPosition}-icon`);
    onlyIcon && classes.push(`${prefix}--only-icon`);
    disabled && classes.push(`${prefix}--disabled`);
    loading && classes.push(`${prefix}--loading`);
    squared && classes.push(`${prefix}--squared`);
    className && classes.push(className);

    return classes.join(" ");
  };

  const getLoaderColor = (): Color | AboveColor => {
    if (kind === "decorated" || kind === "solid") {
      return `above-${color}`;
    }
    return color;
  };

  const ChildrenWrap: FC<PropsWithChildren> = ({ children }) => {
    return (
      <>
        {!onlyIcon && (
          <div className={`${prefix}__container__children`}>{children}</div>
        )}
      </>
    );
  };

  const ButtonIcon = (): JSX.Element => {
    return (
      <>
        {icon && (
          <div className={`${prefix}__container__icon`}>
            <Icon svg={icon} />
          </div>
        )}
      </>
    );
  };
  const MemoIcon = useMemo(() => ButtonIcon, [icon, iconTitle]);

  const ButtonLoader = (): JSX.Element => {
    return (
      <>
        {loading && (
          <Loader
            className={`${prefix}__loader-centered`}
            size={size}
            color={getLoaderColor()}
          />
        )}
      </>
    );
  };

  return (
    <Btn
      disabled={disabled || loading}
      {...props}
      ref={ref}
      className={getClasses()}
    >
      <div className={`${prefix}__container`}>
        <MemoIcon />
        <ChildrenWrap>{children}</ChildrenWrap>
        <ButtonLoader />
      </div>
    </Btn>
  );
});
