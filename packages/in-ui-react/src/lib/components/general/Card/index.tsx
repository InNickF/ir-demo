import { forwardRef } from "react";

import { CardProps } from "./props";
import "./styles.css";

/**
 * In UI Card Component
 * @see {@link https://todo.com/} for official documentation.
 * @param padding
 * Default: true |
 * Specifies if the card must have padding.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param hover
 * Default: false |
 * Specifies hover box-shadow interaction.
 * @param shadow
 * Default: "0" |
 * Specifies box-shadow level.
 * @interface CardProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Card react component
 */

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = true,
      shadow = "0",
      className,
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-card";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      padding && classes.push(`${prefix}--padding`);
      shadow && classes.push(`in-ui--shadow-${shadow}`);
      hover &&
        classes.push(...[`in-ui--shadow-${shadow}-hover`, "in-ui--shadow"]);
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <div className={getClasses()} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
