import { forwardRef } from "react";
import { TableRowProps } from "../props";
import "../styles.css";

/**
 * In UI Table Row Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Row react component
 */

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-table__row";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <tr className={getClasses()} {...props} ref={ref}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";
