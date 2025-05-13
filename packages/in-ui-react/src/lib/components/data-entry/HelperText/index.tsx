import { forwardRef } from "react";
import { HelperTextProps } from "./props";
import "./styles.css";

/**
 * In UI Helper text Component
 * @see {@link https://todo.com/} for official documentation.
 * @param color
 * Default: 'currentColor' |
 * Specifies the icon style color with a string.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param children
 * The classic React children prop.
 * @interface HelperTextProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Helper Text react component
 */
export const HelperText = forwardRef<HTMLElement, HelperTextProps>(
  ({ children, color, className, ...props }, ref) => {
    const prefix = "in-ui-helper-text";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, `${prefix}--${color}`];

      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <small ref={ref} className={getClasses()} {...props}>
        {children}
      </small>
    );
  }
);

HelperText.displayName = "HelperText";
