import { forwardRef } from "react";
import { LoadingLineProps } from "./props";
import "./styles.css";

/**
 * In UI LoadingLine Component
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
 * @param persist
 * Default: false |
 * Render a span element to keep loading size on DOM.
 * @param isActive
 * Default: true |
 * To render the line animation.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @returns
 * A inUI loader react component
 */
export const LoadingLine = forwardRef<HTMLDivElement, LoadingLineProps>(
  (
    {
      color = "primary",
      role = "alert",
      size = "normal",
      velocity = "default",
      "aria-busy": ariaBusy = true,
      className,
      title = "Loading line animation",
      isActive = true,
      persist = false,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-loading-line";

    const getClasses = (): string => {
      const classes: string[] = [
        `${prefix}`,
        `${prefix}--${color}`,
        `${prefix}--${size}-size`,
        `${prefix}--${velocity}-velocity`,
      ];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <>
        {isActive ? (
          <div
            className={getClasses()}
            role={role}
            ref={ref}
            aria-busy={ariaBusy}
            title={title}
            {...props}
          />
        ) : null}
        {persist && !isActive ? (
          <span className={`${prefix}--persist ${prefix}--${size}-size`} />
        ) : null}
      </>
    );
  }
);

LoadingLine.displayName = "LoadingLine";
