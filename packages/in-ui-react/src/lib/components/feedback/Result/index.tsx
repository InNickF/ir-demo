import { forwardRef, FC } from "react";
import { ResultProps } from "./props";
import { Icon } from "../../general/Icon";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import "./styles.css";

const icons = {
  info: <InformationCircleIcon />,
  success: <CheckCircleIcon />,
  error: <XCircleIcon />,
};

/**
 * In UI Result Component
 * @see {@link https://todo.com/} for official documentation.
 * @param description
 * Specifies the text to be shown
 * @param kind
 * Default: 'info'
 * Type of result
 * @param iconSize
 * Default: '3.5rem' |
 * Specifies the icon size with string Ex: 200px || 10% || 5rem || 2em.
 * @param children
 * The classic React children prop.
 * @param onlyText
 * Default: false |
 * Specifies if the component will show only the description
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css
 * @interface ResultProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI Result react component
 */
export const Result = forwardRef<HTMLDivElement, ResultProps>(
  (
    {
      description,
      kind = "info",
      iconSize = "3.5rem",
      onlyText = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-result";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    const ResultDescription = (): JSX.Element => {
      return <div className={`${prefix}__description`}>{description}</div>;
    };

    return (
      <div className={getClasses()} ref={ref} {...props}>
        <ResultIcon
          prefix={prefix}
          kind={kind}
          onlyText={onlyText}
          iconSize={iconSize}
        />
        <ResultDescription />
        {children}
      </div>
    );
  }
);

const ResultIcon: FC<
  Pick<ResultProps, "prefix" | "onlyText" | "kind" | "iconSize">
> = ({ prefix, onlyText, kind, iconSize }) => {
  const icon = icons[kind as keyof typeof icons];
  return (
    <>
      {!onlyText ? (
        <Icon
          className={`${prefix}__icon__${kind}`}
          svg={icon}
          specificSize={iconSize}
        />
      ) : null}
    </>
  );
};

Result.displayName = "Result";
