import { forwardRef } from "react";
import { ListRowProps } from "../props";

/**
 * In UI ListRow Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @interface ListRowProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI ListRow react component
 */
export const Row = forwardRef<HTMLTableRowElement, ListRowProps>(
  ({ children, divider = true, className, ...props }, ref) => {
    const prefix = "in-ui-list__row";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      divider && classes.push(`${prefix}--divider`);
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <>
        <tr className={getClasses()} {...props} ref={ref}>
          {children}
        </tr>
      </>
    );
  }
);

Row.displayName = "Row";
