import { forwardRef } from "react";
import { TableBodyProps } from "../props";
import "../styles.css";

/**
 * In UI Table Body Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Body react component
 */

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-table__body";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <tbody className={getClasses()} {...props} ref={ref}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";
