import { forwardRef, useId } from "react";
import { CheckboxProps } from "./props";
import { Checkbox as RkCheckbox } from "reakit/Checkbox";
import { Label } from "../Label";
import { HelperText } from "../HelperText";
import "./styles.css";

/**
 * In UI Checkbox Component
 * @see {@link https://todo.com/} for official documentation.
 * @param label
 * Default: undefined |
 * Specifies label text.
 * @param color
 * Default: 'currentColor' |
 * Specifies the icon style color with a string.
 * @param id
 * Default: undefined |
 * Input id.
 * @param name
 * Default: undefined |
 * Input name.
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
 * @interface CheckboxProps
 * This is the custom interface created for this component logic.
 * @interface HTMLInputElement
 * @returns
 * A inUI Checkbox react component
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      tooltip,
      id,
      name,
      disabled,
      error,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-checkbox";
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
      if (!id && name) {
        return name;
      }
      return uniqueId;
    };

    const CheckboxError = () => {
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
          <RkCheckbox
            id={getId()}
            name={name}
            disabled={disabled}
            ref={ref}
            {...props}
          />
          {label ? (
            <Label
              required={required}
              tooltip={tooltip}
              uppercase={false}
              htmlFor={getId()}
            >
              {label}
            </Label>
          ) : null}
        </div>
        <div className={`${prefix}__hint__container`}>
          <CheckboxError />
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
