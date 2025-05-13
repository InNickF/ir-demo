import { forwardRef, FC } from "react";
import { EmptyProps } from "./props";
import { Icon } from "../../general/Icon";
import { InboxIcon } from "@heroicons/react/24/outline";
import "./styles.css";

const defaultDescription = <p>There is no information to show.</p>;

/**
 * In UI Empty Component
 * @see {@link https://todo.com/} for official documentation.
 * @param description
 * Default: "No data" |
 * Specifies the text to be shown
 * @param icon
 * Default: 'inbox' |
 * Specifies the icon to be shown
 * @param iconSize
 * Default: '3.5rem' |
 * Specifies the icon size with string Ex: 200px || 10% || 5rem || 2em.
 * @param children
 * Default: "<p>There is no information to show.</p>"
 * The classic React children prop.
 * @param onlyText
 * Default: false |
 * Specifies if the component will show only the description
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css
 * @interface EmptyProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI Empty react component
 */
export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      description = defaultDescription,
      icon,
      iconSize = "3.5rem",
      onlyText = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-empty";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    const EmptyDescription = (): JSX.Element => {
      return <div className={`${prefix}__description`}>{description}</div>;
    };

    return (
      <div className={getClasses()} ref={ref} {...props}>
        <EmptyIcon icon={icon} onlyText={onlyText} iconSize={iconSize} />
        <EmptyDescription />
        {children}
      </div>
    );
  }
);

const EmptyIcon: FC<Pick<EmptyProps, "onlyText" | "icon" | "iconSize">> = ({
  onlyText,
  icon = <InboxIcon />,
  iconSize,
}) => {
  return <>{!onlyText ? <Icon svg={icon} specificSize={iconSize} /> : null}</>;
};

Empty.displayName = "Empty";
