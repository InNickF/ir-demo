import { XMarkIcon } from "@heroicons/react/24/outline";
import { cloneElement, forwardRef } from "react";
import { Button } from "../../general/Button";
import { Heading } from "../../general/Heading";
import { Divider } from "../../layout/Divider";
import { Portal } from "../../other/Portal";
import { Overlay } from "../Overlay";
import { DrawerComponentGroup, DrawerHeaderProps, DrawerProps } from "./props";

import "./styles.css";
/**
 * In UI Drawer Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * The classic React children prop.
 * @param placement
 * Default: right |
 * Drawer placement.
 * @param isOpen
 * Default: false |
 * Tells to drawer if must be open.
 * @param close
 * Call on close action
 * @param fullscreen
 * Default: false |
 * Render a fullscreen drawer container.
 * @param closeWithOverlay
 * Default: true |
 * Call close function when overlay is clicked.
 * @param header
 * Default: undefined |
 * Header render prop.
 * @interface HTMLDivElement
 * @returns
 * A inUI Drawer react component
 */
export const DrawerComponent = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      children,
      placement = "right",
      isOpen,
      close,
      fullscreen,
      header,
      closeWithOverlay = true,
      withOverlay = true,
      withPortal = true,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-drawer";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      placement && classes.push(`${prefix}--${placement}`);
      fullscreen && classes.push(`${prefix}--fullscreen`);
      isOpen && classes.push(`${prefix}--open`);
      return classes.join(" ");
    };
    return withPortal ? (
      <Portal>
        <div ref={ref} className={getClasses()} {...props}>
          {header && cloneElement(header, { close, ...header.props })}
          {children}
        </div>
        {isOpen && withOverlay ? (
          <Overlay
            portal={false}
            onClick={() => {
              closeWithOverlay && close();
            }}
          />
        ) : null}
      </Portal>
    ) : (
      <>
        <div ref={ref} className={getClasses()} {...props}>
          {header && cloneElement(header, { close, ...header.props })}
          {children}
        </div>
        {isOpen && withOverlay ? (
          <Overlay
            portal={false}
            onClick={() => {
              closeWithOverlay && close();
            }}
          />
        ) : null}
      </>
    );
  }
);
DrawerComponent.displayName = "Drawer";

/**
 * In UI Drawer Header Component
 * @see {@link https://todo.com/} for official documentation.
 * @param title
 * Default: undefined |
 * Drawer title
 * @param close
 * Change isOpen value
 * @interface DrawerHeaderProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI Drawer Header react component
 */
const Header = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ title, close, ...props }, ref) => {
    const prefix = "in-ui-drawer__header";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      return classes.join(" ");
    };

    return (
      <>
        <div className={getClasses()} {...props} ref={ref}>
          <Button onlyIcon icon={<XMarkIcon />} kind="ghost" onClick={close} />
          <Heading kind="h3">{title}</Heading>
        </div>
        <Divider />
      </>
    );
  }
);

Header.displayName = "Drawer Header";

const Drawer = DrawerComponent as DrawerComponentGroup;
Drawer.Header = Header as DrawerComponentGroup["Header"];

export default Drawer;
