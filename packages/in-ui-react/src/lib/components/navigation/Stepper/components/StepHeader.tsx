import { forwardRef, cloneElement, isValidElement, Children } from "react";
import { StepHeaderProps } from "../props";

/**
 * In UI StepHeader Component
 * @see {@link https://todo.com/} for official documentation.
 * @param current
 * Specifies the current step.
 * @interface StepContentProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI StepHeader react component
 */
export const StepHeader = forwardRef<HTMLUListElement, StepHeaderProps>(
  ({ className, children, current, ...props }, ref) => {
    const prefix = "in-ui-stepper__step__header";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(`${className}`);
      return classes.join(" ");
    };
    const childrenWithProps = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, { current, ...child.props });
      }
      return child;
    });

    return (
      <ul className={getClasses()} {...props} ref={ref}>
        {childrenWithProps}
      </ul>
    );
  }
);

StepHeader.displayName = "StepHeader";
