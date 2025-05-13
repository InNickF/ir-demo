import { forwardRef } from "react";
import { StepContentProps } from "../props";

/**
 * In UI StepContent Component
 * @see {@link https://todo.com/} for official documentation.
 * @param current
 * Specifies the current step.
 * @param step
 * Step number (identifier)
 * @interface StepContentProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI StepContent react component
 */
export const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, children, current, step, ...props }, ref) => {
    const prefix = "in-ui-stepper__step__content";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(`${className}`);
      current === step &&
        classes.push(`${prefix}--visible in-ui-animation--appears`);
      return classes.join(" ");
    };

    return (
      <div className={getClasses()} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

StepContent.displayName = "StepContent";
