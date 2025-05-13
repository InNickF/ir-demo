import { FC, forwardRef, PropsWithChildren, useId, useMemo } from "react";
import { Label } from "../Label";
import { Icon } from "../../general/Icon";
import { HelperText } from "../HelperText";
import { IconProps } from "../../general/Icon/props";
import { LoadingLine } from "../../feedback/LoadingLine";
import { TextAreaProps } from "./props";
import "./styles.css";

/**
 * In UI TextArea Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * Default: undefined |
 * @param label
 * Default: undefined |
 * Specifies label text.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param tooltip
 * Default: undefined |
 * Label tooltip content (string | JSX.Element).
 * @param id
 * Default: undefined |
 * TextArea id.
 * @param name
 * Default: undefined |
 * TextArea name.
 * @param hint
 * Default: undefined |
 * Shot text to show on hover/focus under textarea. (HelperText component)
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
 * TextArea disabled attribute.
 * @param color
 * Default: "default" |
 * Specifies textarea container color.
 * @param loading
 * Default: false |
 * Specifies input container color.
 * @interface TextAreaProps
 * This is the custom interface created for this component logic.
 * @interface TextAreaHTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI TextArea react component
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      children,
      label,
      className,
      tooltip,
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
      loading,
      required,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-textarea";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      error && classes.push(`${prefix}--error`);
      disabled && classes.push(`${prefix}--disabled`);
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

    const TextAreaLabel = () => {
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
    const MemoTextAreaLabel = useMemo(() => TextAreaLabel, [label, tooltip]);

    const TextAreaIcon = ({
      icon,
      className,
      action,
    }: {
      icon: IconProps["svg"];
      className: string;
      action?: () => void;
    }) => {
      return (
        <Icon
          svg={icon}
          color={error ? "error" : undefined}
          className={`${className} ${prefix}-icon`}
          hoverTransition
          onClick={action || ((e) => e.preventDefault())}
        />
      );
    };
    const LeftIcon = () => {
      return (
        <>
          {leftIcon && (
            <TextAreaIcon
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
            <TextAreaIcon
              className={`${prefix}__right-icon`}
              icon={rightIcon}
              action={rightIconAction}
            />
          )}
        </>
      );
    };

    const TextAreaError = () => {
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
    const TextAreaHint = () => {
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
        <MemoTextAreaLabel />
        <div>
          <MemoLoading />
          <div className={`${prefix}__container`}>
            <LeftIcon />
            <textarea
              id={getId()}
              name={name}
              className={`${prefix}__element`}
              ref={ref}
              placeholder={placeholder}
              disabled={disabled}
              {...props}
            >
              {children}
            </textarea>
            <RightIcon />
          </div>
        </div>
        <HintContainer>
          <TextAreaHint />
          <TextAreaError />
        </HintContainer>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
