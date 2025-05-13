import { forwardRef } from "react";
import { LoaderProps } from "./props";
import "./styles.css";

/**
 * In UI Loader Component
 * @see {@link https://todo.com/} for official documentation.
 * @param color
 * Default: 'primary' |
 * Specifies the loader style color with a string.
 * @param size
 * Default: 'normal' |
 * Specifies the loader size with a string.
 * @param velocity
 * Default: 'default' |
 * Specifies the loader animation velocity with a string.
 * @param animation
 * Default: 'default' |
 * Specifies the css animation-timing-function with a string.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @returns
 * A inUI loader react component
 */
export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(
  (
    {
      color = "primary",
      role = "alert",
      size = "normal",
      velocity = "default",
      animation = "default",
      "aria-busy": ariaBusy = true,
      className,
      title = "Loading animation",
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-loader";

    const getClasses = (): string => {
      const classes: string[] = [
        `${prefix}`,
        `${prefix}--${color}`,
        `${prefix}--${size}-size`,
        `${prefix}--${velocity}-velocity`,
        `${prefix}--${animation}-timing-function`,
      ];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <span
        className={getClasses()}
        role={role}
        ref={ref}
        aria-busy={ariaBusy}
        title={title}
        {...props}
      />
    );
  }
);

Loader.displayName = "Loader";
