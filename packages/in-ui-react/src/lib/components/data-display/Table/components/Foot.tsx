import { forwardRef } from "react";
import { TableFootProps } from "../props";
import "../styles.css";

/**
 * In UI Table Foot Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Foot react component
 */

export const TableFoot = forwardRef<HTMLTableSectionElement, TableFootProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-table__foot";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <tfoot className={getClasses()} {...props} ref={ref}>
        {children}
      </tfoot>
    );
  }
);

TableFoot.displayName = "TableFoot";
