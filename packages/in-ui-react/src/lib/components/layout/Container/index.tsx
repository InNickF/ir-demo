import { forwardRef } from "react";
import { ContainerProps } from "./props";
import "./styles.css";

/**
 * In UI link Component
 * @see {@link https://todo.com/} for official documentation.
 * @param fluid
 * Default: 'false' |
 * Specifies if the container will fill the total width of the    horizontal viewport.
 * @param children
 * The classic React children prop.
 * @interface HTMLDivElement
 * @returns
 * A inUI container react component
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ fluid = false, children, className, ...props }, ref) => {
    const prefix = "in-ui-container";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      fluid && classes.push(`${prefix}--fluid`);
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <section {...props} ref={ref} className={getClasses()}>
        {children}
      </section>
    );
  }
);

Container.displayName = "Container";
