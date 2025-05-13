import { FC, forwardRef, PropsWithChildren, useId, useMemo } from "react";
import { Input as RkInput } from "reakit/Input";
import { Label } from "../Label";
import { Icon } from "../../general/Icon";
import { HelperText } from "../HelperText";
import { IconProps } from "../../general/Icon/props";
import { LoadingLine } from "../../feedback/LoadingLine";
import { InputProps } from "./props";
import "./styles.css";

/**
 * In UI Input Component
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
 * @param name
 * Default: undefined |
 * Input name.
 * @param hint
 * Default: undefined |
 * Shot text to show on hover/focus under input. (HelperText component)
 * @param error
 * Default: undefined |
 * Error message (string).
 * @param leftIcon
 * Default: undefined |
 * Left icon name to render it.
 * @param rightIcon
 * Default: undefined |
 * Reft icon name to render it.
 * @param leftIconTitle
 * Default: undefined |
 * Specifies left icon title for accessibility
 * @param rightIconTitle
 * Default: undefined |
 * Specifies right icon title for accessibility
 * @param leftIconAction
 * Default: undefined |
 * Specifies left icon on click action
 * @param rightIconAction
 * Default: undefined |
 * Specifies right icon on click action
 * @param disabled
 * Default: undefined |
 * Input disabled attribute.
 * @param color
 * Default: "default" |
 * Specifies input container color.
 * @param loading
 * Default: false |
 * Specifies input container color.
 * @interface InputProps
 * This is the custom interface created for this component logic.
 * @interface InputHTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Input react component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      className,
      tooltip,
      type = "text",
      placeholder,
      name,
      id,
      hint,
      error,
      leftIcon,
      rightIcon,
      leftIconAction,
      rightIconAction,
      disabled,
      color = "default",
      loading = false,
      readOnly,
      required,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-input";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      error && classes.push(`${prefix}--error`);
      disabled && classes.push(`${prefix}--disabled`);
      readOnly && classes.push(`${prefix}--read-only`);
      color !== "default" && classes.push(`${prefix}--${color}`);
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

    const InputLabel = () => {
      return (
        <>
          {label && (
            <Label required={required} tooltip={tooltip} htmlFor={getId()}>
              {label}
            </Label>
          )}
        </>
      );
    };
    const MemoInputLabel = useMemo(() => InputLabel, [label, tooltip]);

    const InputIcon = ({
      icon,
      className,
      action,
    }: {
      icon: IconProps["svg"];
      className: string;
      action?: () => void;
    }) => {
      const getClasses = (): string => {
        const classes: string[] = [`${prefix}-icon`];
        className && classes.push(className);
        action && classes.push(`${prefix}-icon--action`);
        return classes.join(" ");
      };

      return (
        <Icon
          svg={icon}
          color={error ? "error" : undefined}
          className={getClasses()}
          hoverTransition
          onClick={action || ((e) => e.preventDefault())}
        />
      );
    };
    const LeftIcon = () => {
      return (
        <>
          {leftIcon && (
            <InputIcon
              className={`${prefix}__left-icon`}
              icon={leftIcon}
              action={leftIconAction}
            />
          )}
        </>
      );
    };

    const RightIcon = () => {
      return (
        <>
          {rightIcon && (
            <InputIcon
              className={`${prefix}__right-icon`}
              icon={rightIcon}
              action={rightIconAction}
            />
          )}
        </>
      );
    };

    const InputError = () => {
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
    const InputHint = () => {
      return (
        <>
          {hint && (
            <HelperText className={`${prefix}__helper`}>{hint}</HelperText>
          )}
        </>
      );
    };

    const HintContainer: FC<PropsWithChildren> = ({ children }) => {
      return (
        <>
          {hint || error ? (
            <div className={`${prefix}__hint__container`}>{children}</div>
          ) : null}
        </>
      );
    };

    const Loader = () => {
      return loading ? <LoadingLine /> : null;
    };

    const MemoLoading = useMemo(() => Loader, [loading]);

    return (
      <div className={getClasses()}>
        <MemoInputLabel />
        <div>
          <MemoLoading />
          <div className={`${prefix}__container`}>
            <LeftIcon />
            <RkInput
              id={getId()}
              name={name}
              className={`${prefix}__element`}
              ref={ref}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              {...props}
            />
            <RightIcon />
          </div>
        </div>
        <HintContainer>
          <InputHint />
          <InputError />
        </HintContainer>
      </div>
    );
  }
);

Input.displayName = "Input";
