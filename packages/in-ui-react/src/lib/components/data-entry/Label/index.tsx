import { forwardRef, FC } from "react";
import { LabelProps } from "./props";
import { Tooltip } from "../../feedback/Tooltip";
import { Icon } from "../../general/Icon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import "./styles.css";

const prefix = "in-ui-label";
/**
 * In UI Label Component
 * @see {@link https://todo.com/} for official documentation.
 * @param label
 * Default: undefined |
 * Specifies label text.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param tooltip
 * Default: undefined |
 * Label tooltip content (string | JSX.Element).
 * @param type
 * Default: "text" |
 * Input type.
 * @param id
 * Default: undefined |
 * Input id.
 * @param hint
 * Default: undefined |
 * Shot text to show on hover/focus under input. (HelperText component)
 * @param error
 * Default: undefined |
 * Error message (string).
 * @param Icon
 * Default: "information-circle" |
 * Tooltip icon
 * @param disabled
 * Default: undefined |
 * Input disabled attribute.
 * @param uppercase
 * Default: false |
 * Makes the label uppercase or lowercase
 * @interface LabelProps
 * This is the custom interface created for this component logic.
 * @interface LabelHTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Label react component
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      tooltip,
      htmlFor,
      icon,
      uppercase = true,
      className,
      required = false,
      ...props
    },
    ref
  ) => {
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      uppercase && classes.push(`${prefix}--uppercase`);
      className && classes.push(className);
      return classes.join(" ");
    };

    const RequiredLabelSuffix = () => {
      return required ? (
        <span className={`${prefix}--required-label-suffix`}>*</span>
      ) : null;
    };

    return (
      <label className={getClasses()} ref={ref} htmlFor={htmlFor} {...props}>
        {children}
        <RequiredLabelSuffix />
        <InfoTooltip tooltip={tooltip} icon={icon} />
      </label>
    );
  }
);

const InfoTooltip: FC<Pick<LabelProps, "tooltip" | "icon">> = ({
  tooltip,
  icon = <InformationCircleIcon />,
}) => {
  return (
    <>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <Icon
            svg={icon}
            specificSize="18px"
            className={`${prefix}-tooltip-icon`}
          />
        </Tooltip>
      ) : null}
    </>
  );
};

Label.displayName = "Label";
