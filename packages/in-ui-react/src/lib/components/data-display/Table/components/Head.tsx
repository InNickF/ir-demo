import { forwardRef } from "react";
import { TableHeadProps } from "../props";
import "../styles.css";

/**
 * In UI Table Head Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Head react component
 */

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-table__head";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <thead className={getClasses()} {...props} ref={ref}>
        {children}
      </thead>
    );
  }
);

TableHead.displayName = "TableHead";
