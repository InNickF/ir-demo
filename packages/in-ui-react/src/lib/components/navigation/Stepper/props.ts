import { HTMLAttributes } from "react";
import { IconProps } from "../../general/Icon/props";
import { StepperComponent } from ".";
import { Step, StepContent, StepHeader } from "./components";
export interface StepProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Step number (identifier)
   */
  step?: number;
  /**
   * Step title
   */
  title: string;
  /**
   * Default: "information-circle" |
   * Tooltip icon description.
   */
  icon?: IconProps["svg"];
  /**
   * Default: undefined |
   * Tooltip step description
   */
  description?: string;
  /**
   * Default: false |
   * Specifies if the step is ready
   */
  isReady?: boolean;
  current: number;
}

export type StepContentProps = Pick<
  StepProps,
  "className" | "children" | "step" | "current"
>;

export type StepHeaderProps = Pick<
  StepProps,
  "className" | "children" | "current"
>;

export type StepperComponentGroup = typeof StepperComponent & {
  /**
   * Step component
   */
  Step: typeof Step;
  /**
   * Step Content component
   */
  StepContent: typeof StepContent;
  /**
   * Step Header component
   */
  StepHeader: typeof StepHeader;
};
