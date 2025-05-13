import { forwardRef } from "react";
import { ListHeaderProps } from "../props";

/**
 * In UI ListHeader Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @interface ListHeaderProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI ListHeader react component
 */
export const Header = forwardRef<HTMLTableCellElement, ListHeaderProps>(
  ({ children, ...props }, ref) => {
    const prefix = "in-ui-list__header";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      return classes.join(" ");
    };
    return (
      <th className={getClasses()} {...props} ref={ref}>
        {children}
      </th>
    );
  }
);

Header.displayName = "Header";
