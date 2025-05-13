import { forwardRef } from "react";
import { NavbarProps } from "./props";
import "./styles.css";

/**
 * In UI Navbar Component
 * @see {@link https://todo.com/} for official documentation.
 * @param paddingX
 * Default: "none" |
 * Specifies the padding of each horizontal side
 * @param children
 * The classic React children prop.
 * @interface NavbarProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Navbar react component
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ paddingX = "none", children, className, ...props }, ref) => {
    const prefix = "in-ui-navbar";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      paddingX !== "none" && classes.push(`${prefix}--padding-${paddingX}`);
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <nav className={getClasses()} ref={ref} {...props}>
        {children}
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";
