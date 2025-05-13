import { forwardRef } from "react";
import { ListHeadProps } from "../props";

/**
 * In UI THead Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @interface ListHeaderProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI THead react component
 */
export const Head = forwardRef<HTMLTableSectionElement, ListHeadProps>(
  ({ children, className, ...props }, ref) => {
    const prefix = "in-ui-list__head";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <thead className={getClasses()} {...props} ref={ref}>
        <tr>{children}</tr>
      </thead>
    );
  }
);

Head.displayName = "Head";
