import { forwardRef } from "react";
import { DockItem } from "./components/Item";
// import { DockIndicator } from "./components/Indicator";
import { DockViewport } from "./components/Viewport";
import { Root as RMenu, List as RList } from "@radix-ui/react-navigation-menu";
import { DockGroupType, DockProps } from "./props";
import "./styles.css";

export const DockWrapper = forwardRef<HTMLElement, DockProps>(
  ({ children, className }, ref) => {
    const prefix = "in-ui-dock";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <RMenu orientation="horizontal" ref={ref} className={getClasses()}>
        <RList className={`${prefix}__list`}>
          {children}
          {/* <DockIndicator /> */}
        </RList>
        <DockViewport />
      </RMenu>
    );
  }
);

DockWrapper.displayName = "DockWrapper";

const Dock = DockWrapper as DockGroupType;
Dock.Item = DockItem;

export default Dock;
