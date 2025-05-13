import { forwardRef } from "react";
import {
  Indicator as RIndicator,
  NavigationMenuIndicatorProps,
} from "@radix-ui/react-navigation-menu";
import "./styles.css";

export const DockIndicator = forwardRef<
  HTMLDivElement,
  NavigationMenuIndicatorProps
>((props, ref) => {
  const prefix = "in-ui-dock-indicator";
  return (
    <RIndicator className={prefix} ref={ref} {...props}>
      <div className={`${prefix}__arrow`}></div>
    </RIndicator>
  );
});

DockIndicator.displayName = "DockIndicator";
