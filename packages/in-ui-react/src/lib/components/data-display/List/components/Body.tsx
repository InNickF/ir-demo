import { forwardRef } from "react";
import { ListBodyProps } from "../props";

/**
 * In UI ListBody Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @interface ListBodyProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI ListBody react component
 */
export const Body = forwardRef<HTMLTableSectionElement, ListBodyProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-list__body";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <tbody className={getClasses()} ref={ref} {...props}>
        {children}
      </tbody>
    );
  }
);

Body.displayName = "Body";
