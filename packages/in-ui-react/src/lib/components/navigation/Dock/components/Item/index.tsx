import { forwardRef } from "react";
import { DockContent } from "../Content";
import { DockLabel } from "../Label";
import { Item as RItem } from "@radix-ui/react-navigation-menu";
import { AsElement, PolymorphicRef } from "../../../../utils/types";
import { DockItemProps } from "../../props";
import { FolderIcon } from "@heroicons/react/24/outline";
import "./styles.css";

/**
 * In UI DockItem Component
 * @see {@link https://todo.com/} for official documentation.
 * @param as
 * Default: null |
 * Specifies render element, can be a html type or component type
 * @param icon
 * Set the inUI icon name.
 * @param active
 * Default: false |
 * Set the component state to active
 * @param label
 * Specifies the text to show as content header
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @returns
 * A inUI DockItem react component
 */

type Item = <C extends AsElement>(
  props: DockItemProps<C>
) => React.ReactElement | null;

export const DockItem: Item = forwardRef(function Item<
  C extends AsElement = "button"
>(
  {
    as,
    label,
    icon = <FolderIcon />,
    active = false,
    children,
    className,
    ...props
  }: DockItemProps<C>,
  ref?: PolymorphicRef<C>
) {
  const prefix = "in-ui-dock-item";

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    className && classes.push(className);
    return classes.join(" ");
  };

  const finalAs = as;

  return (
    <RItem className={getClasses()} ref={ref}>
      <DockLabel
        active={active}
        as={finalAs as AsElement}
        icon={icon}
        label={label}
        isTrigger={!!children}
        {...props}
      />
      {children ? <DockContent>{children}</DockContent> : null}
    </RItem>
  );
});
