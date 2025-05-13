import { forwardRef } from "react";
import { Heading } from "../Heading";
import { Divider } from "../../layout/Divider";

import "./styles.css";
import { TitleProps } from "./props";

/**
 * In UI link Component
 * @see {@link https://todo.com/} for official documentation.
 * @param kind
 * Default: 'display' |
 * Specifies which heading kind to render.
 * @param children |
 * The classic React children prop.
 * @interface TitleProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI Title react component
 */
export const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ kind = "h2", children, className, ...props }, ref) => {
    const getClasses = () => {
      const classes = ["in-ui-title"];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <div ref={ref} className={getClasses()} {...props}>
        <Heading kind={kind}>{children}</Heading>
        <Divider />
      </div>
    );
  }
);

Title.displayName = "Title";
