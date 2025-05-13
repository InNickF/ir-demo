import { forwardRef } from "react";
import {
  Viewport as RViewport,
  NavigationMenuViewportProps,
} from "@radix-ui/react-navigation-menu";
import "./styles.css";

export const DockViewport = forwardRef<
  HTMLDivElement,
  NavigationMenuViewportProps
>((props, ref) => {
  const prefix = "in-ui-dock-viewport";
  return (
    <div className="in-ui-dock-viewport__position">
      <RViewport className={prefix} ref={ref} {...props} />
    </div>
  );
});

DockViewport.displayName = "DockViewport";
