import { forwardRef } from "react";
import { MenuItem } from "reakit/Menu";
import { Button } from "../../../../general/Button";
import "./styles.css";
import { MenuItemButtonProps } from "../../props";
import { capitalizedText } from "../../utils";

export const MenuItemButton = forwardRef<
  HTMLButtonElement,
  MenuItemButtonProps
>(({ label, className, onClick, unDeletable = false, ...props }, ref) => {
  const prefix = "in-ui-options__menu-item";

  const getClasses = (): string => {
    const classes: string[] = [`${prefix}`];
    unDeletable && classes.push(`${prefix}--un-deletable`);
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <MenuItem
      {...props}
      ref={ref}
      as={Button}
      kind="ghost"
      textLeft
      className={getClasses()}
      onClick={() => {
        !unDeletable && onClick();
      }}
    >
      {capitalizedText(label)}
    </MenuItem>
  );
});

MenuItemButton.displayName = "MenuItemButton";
