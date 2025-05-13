import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { DrawerComponent } from ".";

export type Placement = "top" | "bottom" | "left" | "right";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
  /**
   * Default: false |
   * Tells to drawer if must be open.
   */
  isOpen: boolean;
  /**
   * Default: true |
   * Render overlay
   */
  withOverlay?: boolean;
  /**
   * Default: true |
   * Render portal
   */
  withPortal?: boolean;
  /**
   * Call on close action
   */
  close: () => void;
  /**
   * Default: right |
   * Drawer placement.
   */
  placement?: Placement;
  /**
   * Default: false |
   * Render a fullscreen drawer container.
   */
  fullscreen?: boolean;
  /**
   * Default: true |
   * Call close function when overlay is clicked.
   */
  closeWithOverlay?: boolean;
  /**
   * Default: undefined |
   * Header render prop.
   */
  header?: ReactElement;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: undefined |
   * Drawer title
   */
  title?: string;
  /**
   * Change isOpen value
   */
  close: DrawerProps["close"];
}

export type DrawerComponentGroup = typeof DrawerComponent & {
  /**
   * Header component to drawer
   */
  Header: ForwardRefExoticComponent<
    Omit<DrawerHeaderProps, "close"> & React.RefAttributes<HTMLDivElement>
  >;
};
