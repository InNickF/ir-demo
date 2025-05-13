import { forwardRef, useId } from "react";
import { RadioProps } from "./props";
import { Label } from "../Label";
import { HelperText } from "../HelperText";
import "./styles.css";

/**
 * In UI Radio Component
 * @see {@link https://todo.com/} for official documentation.
 * @param label
 * Default: undefined |
 * Specifies label text.
 * @param id
 * Default: undefined |
 * Input id.
 * @param name
 * Default: undefined |
 * Input name.
 * @param checked
 * Default: undefined |
 * Input checked property.
 * @param error
 * Default: undefined |
 * Error message (string).
 * @param disabled
 * Default: undefined |
 * Input disabled attribute.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param tooltip
 * Default: undefined |
 * Label tooltip content (string | JSX.Element).
 * @param children
 * The classic React children prop.
 * @interface RadioProps
 * This is the custom interface created for this component logic.
 * @interface HTMLInputElement
 * @returns
 * A inUI Radio react component
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      tooltip,
      id,
      name,
      checked,
      disabled,
      error,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-radio";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];

      disabled && classes.push(`${prefix}--disabled`);
      className && classes.push(className);
      return classes.join(" ");
    };

    const uniqueId = useId();
    const getId = () => {
      if (id) {
        return id;
      }
      return uniqueId;
    };

    const RadioError = () => {
      return (
        <>
          {error && (
            <HelperText className={`${prefix}__error-helper`} color="error">
              {error}
            </HelperText>
          )}
        </>
      );
    };

    return (
      <div className={getClasses()}>
        <div className={`${prefix}__container`}>
          <input
            id={getId()}
            name={name}
            checked={checked}
            disabled={disabled}
            ref={ref}
            type="radio"
            {...props}
          />
          <Label
            required={required}
            tooltip={tooltip}
            uppercase={false}
            htmlFor={getId()}
          >
            {label}
          </Label>
        </div>
        <div className={`${prefix}__hint__container`}>
          <RadioError />
        </div>
      </div>
    );
  }
);

Radio.displayName = "Radio";
