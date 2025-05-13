import { forwardRef } from "react";
import { Menu } from "reakit/Menu";
import { MenuContainerProps } from "../../props";
import "./styles.css";

export const MenuContainer = forwardRef<HTMLDivElement, MenuContainerProps>(
  ({ className, children, ...props }, ref) => {
    const prefix = "in-ui-filters__menu";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <Menu
        ref={ref}
        {...props}
        unstable_orphan={true}
        className={getClasses()}
        aria-label="Filter Menu"
      >
        <div className={`${prefix}-container`}>{children}</div>
      </Menu>
    );
  }
);

MenuContainer.displayName = "MenuContainer";
