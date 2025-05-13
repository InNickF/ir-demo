import { forwardRef } from "react";
import { Separator } from "reakit/Separator";
import { DividerProps } from "./props";
import "./styles.css";

/**
 * In UI link Component
 * @see {@link https://todo.com/} for official documentation.
 * @param orientation
 * Default: 'horizontal' |
 * Specifies the divider ortientation.
 * @interface HTMLHRElement
 * @returns
 * A inUI divider react component
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    const prefix = "in-ui-divider";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, `${prefix}--${orientation}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <Separator
        orientation={orientation}
        {...props}
        ref={ref}
        className={getClasses()}
      />
    );
  }
);

Divider.displayName = "Divider";
