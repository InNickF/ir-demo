import { forwardRef } from "react";
import { Portal } from "../../other/Portal";
import { OverlayProps } from "./props";
import "./styles.css";

/**
 * In UI Overlay Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @param portal
 * Default: true |
 * Create component using portal API.
 * @param behindNavigation
 * Default: false |
 * Set z-index behind navigation.
 * @interface HTMLDivElement
 * @returns
 * A inUI overlay react component
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (
    { children, portal = true, behindNavigation = false, className, ...props },
    ref
  ) => {
    const prefix = "in-ui-overlay";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, "in-ui-animation--appears"];
      behindNavigation && classes.push(`${prefix}--behind-navigation`);
      className && classes.push(className);
      return classes.join(" ");
    };

    return portal ? (
      <Portal>
        <div ref={ref} {...props} className={getClasses()}>
          {children}
        </div>
      </Portal>
    ) : (
      <div ref={ref} {...props} className={getClasses()}>
        {children}
      </div>
    );
  }
);

Overlay.displayName = "Overlay";
