import { forwardRef } from "react";
import { Heading } from "../Heading";
import { Icon } from "../Icon";
import { TitleWithIconProps } from "./props";
import "./styles.css";

/**
 * In UI TitleWithIcon Component
 * @see {@link https://todo.com/} for official documentation.
 * @param kind
 * Default: 'display' |
 * Specifies which heading kind to render.
 * @param icon
 * Specifies the icon to be shown
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param children |
 * The classic React children prop.
 * @interface TitleWithIconProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI TitleWithIcon react component
 */

export const TitleWithIcon = forwardRef<HTMLDivElement, TitleWithIconProps>(
  ({ kind = "h5", icon, className, children, ...props }, ref) => {
    const prefix = "in-ui-card-title";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <div className={getClasses()} ref={ref} {...props}>
        <Icon className={`${prefix}__icon`} svg={icon} size="big" />
        <Heading className={`${prefix}__heading`} kind={kind}>
          {children}
        </Heading>
      </div>
    );
  }
);

TitleWithIcon.displayName = "TitleWithIcon";
