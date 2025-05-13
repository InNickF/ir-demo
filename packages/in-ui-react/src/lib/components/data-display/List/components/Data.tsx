import { forwardRef } from "react";
import { ListDataProps } from "../props";

/**
 * In UI ListData Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @interface ListDataProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI ListData react component
 */
export const Data = forwardRef<HTMLTableCellElement, ListDataProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-list__data";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <td className={getClasses()} {...props} ref={ref}>
        {children}
      </td>
    );
  }
);

Data.displayName = "Data";
