import { forwardRef, HTMLAttributes } from "react";
import { StepperComponentGroup } from "./props";
import { Step, StepContent, StepHeader } from "./components";
import "./styles.css";

export const StepperComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const prefix = "in-ui-stepper";
  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(`${className}`);
    return classes.join(" ");
  };

  return (
    <section className={getClasses()} {...props} ref={ref}>
      {children}
    </section>
  );
});

StepperComponent.displayName = "Stepper";

/**
 * In UI Stepper Component
 * @see {@link https://todo.com/} for official documentation.
 * @param current
 * Specifies the current step.
 * @returns
 * A inUI Stepper react component
 */
const Stepper = StepperComponent as StepperComponentGroup;
Stepper.Step = Step as StepperComponentGroup["Step"];
Stepper.StepContent = StepContent as StepperComponentGroup["StepContent"];
Stepper.StepHeader = StepHeader as StepperComponentGroup["StepHeader"];

export default Stepper;
