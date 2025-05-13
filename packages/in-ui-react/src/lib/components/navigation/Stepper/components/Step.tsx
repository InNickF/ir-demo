import { FC, forwardRef } from "react";
import { StepProps } from "../props";
import { Icon } from "../../../general/Icon";
import { Tooltip } from "../../../feedback/Tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

/**
 * In UI Step Component
 * @see {@link https://todo.com/} for official documentation.
 * @param current
 * Specifies the current step.
 * @param description
 * Default: undefined |
 * Tooltip step description
 * @param title
 * Step title
 * @param isReady
 * Default: false |
 * Specifies if the step is ready
 * @param step
 * Step number (identifier)
 * @param icon
 * Default: "information-circle" |
 * Tooltip icon description.
 * @interface StepProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI Step react component
 */
export const Step = forwardRef<HTMLLIElement, StepProps>(
  (
    {
      isReady = false,
      current,
      description,
      className,
      icon,
      title,
      step,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-stepper__step";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(`${className}`);
      isReady && classes.push(`${prefix}--ready`);
      current === step && classes.push(`${prefix}--active`);

      return classes.join(" ");
    };
    return (
      <li className={getClasses()} {...props} ref={ref}>
        <p className={`${prefix}__number`}>{step}</p>
        <span className={`${prefix}__container`}>
          <p className={`${prefix}__title`}>{title}</p>
          <StepHint description={description} icon={icon} />
        </span>
      </li>
    );
  }
);

const StepHint: FC<Pick<StepProps, "description" | "icon">> = ({
  description,
  icon = <InformationCircleIcon />,
}) => {
  return (
    <>
      {description ? (
        <Tooltip content={description}>
          <Icon specificSize="1.25rem" svg={icon} size="small" />
        </Tooltip>
      ) : null}
    </>
  );
};

Step.displayName = "Step";
