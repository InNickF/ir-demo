import { forwardRef } from "react";
import { AsElement, PolymorphicRef } from "../../utils/types";
import { LinkProps } from "./props";
import "./styles.css";

/**
 * In UI link Component
 * @see {@link https://todo.com/} for official documentation.
 * @param as
 * Default: undefined |
 * Specifies render element, can be a html type or component type
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @interface LinkProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI link react component
 */

type LinkComponent = <C extends AsElement = "a">(
  props: LinkProps<C>
) => React.ReactElement | null;

export const Link: LinkComponent = forwardRef(function Link<
  C extends AsElement
>(
  { as, className, children, ...props }: LinkProps<C>,
  ref?: PolymorphicRef<C>
) {
  const prefix = "in-ui-link";

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];

    className && classes.push(className);

    return classes.join(" ");
  };

  const Link = as || "a";

  return (
    <Link {...props} ref={ref} className={getClasses()}>
      {children}
    </Link>
  );
});
