import { forwardRef } from "react";
import { Button } from "../Button";
import { Card } from "../Card";
import { ButtonGroupProps } from "./props";
import "./styles.css";

/**
 * In UI ButtonGroup Component
 * @see {@link https://todo.com/} for official documentation.
 * @param items
 * Buttons specifications prop.
 * @param active
 * Active button key.
 * @interface ButtonGroupProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI ButtonGroup react component
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, active, items, flex, size, ...props }, ref) => {
    const prefix = "in-ui-button-group";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      flex && classes.push(`${prefix}--flex`);
      return classes.join(" ");
    };

    const Buttons = (): JSX.Element => {
      return (
        <>
          {items.map(({ key, onClick, text, ...itemProps }) => {
            return (
              <Button
                key={key}
                className={`${prefix}__button`}
                kind={key === active ? "solid" : "ghost"}
                onClick={() => onClick(key)}
                size={size}
                {...itemProps}
              >
                {text}
              </Button>
            );
          })}
        </>
      );
    };

    return (
      <Card className={getClasses()} ref={ref} {...props}>
        <Buttons />
      </Card>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
