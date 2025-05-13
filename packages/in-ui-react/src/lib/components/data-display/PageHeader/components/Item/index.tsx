import { forwardRef } from "react";
import { Button } from "../../../../general/Button";
import { AsElement, PolymorphicRef } from "../../../../utils/types";
import { PageHeaderItemProps } from "../../props";
import "./styles.css";
/**
 * In UI Item Component
 * @see {@link https://todo.com/} for official documentation.
 * @param as
 * Specifies render element, can be a html type or component type
 * @param icon
 * Set the inUI icon name.
 * @param active
 * Set the component state to active
 * @returns
 * A inUI Item react component
 */

type ItemComponent = <C extends AsElement>(
  props: PageHeaderItemProps<C>
) => React.ReactElement | null;

export const Item: ItemComponent = forwardRef(function Item<
  C extends AsElement = "button"
>(
  { as, icon, active = false, children, ...props }: PageHeaderItemProps<C>,
  ref?: PolymorphicRef<C>
) {
  const prefix = "in-ui-header-item";
  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    active && classes.push(`${prefix}--active`);
    return classes.join(" ");
  };

  const finalAs = as || "button";

  return (
    <Button
      as={finalAs as AsElement}
      icon={icon}
      kind="ghost"
      className={getClasses()}
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});
