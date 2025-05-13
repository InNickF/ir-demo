import { HTMLAttributes, ReactNode } from "react";
import { DockWrapper } from ".";
import { DockItem } from "./components/Item";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { IconProps } from "../../general/Icon/props";
import { AsElement, PolymorphicComponentPropWithRef } from "../../utils/types";

export type DockProps = Omit<NavigationMenuProps, "orientation">;

export type LabelProps<C extends AsElement> = PolymorphicComponentPropWithRef<
  C,
  {
    /**
     * Default: undefined |
     * Specifies render element, can be a html type or component type
     */
    as?: C;
    /**
     * Set the inUI icon name.
     */
    icon: IconProps["svg"];
    /**
     * Default: false |
     * Set the component state to active
     */
    active?: boolean;
    /**
     * Specifies the text to show as content header
     */
    label: string;
    /**
     * Default: false |
     * To show the viewport tooltip body
     */
    isTrigger?: boolean;
  }
>;
export interface ButtonIconProps {
  /**
   * Set the inUI icon name.
   */
  icon: IconProps["svg"];
}

export type DockItemProps<C extends AsElement> =
  PolymorphicComponentPropWithRef<
    C,
    {
      /**
       * Default: undefined |
       * Specifies render element, can be a html type or component type
       */
      as?: C;
      /**
       * Set the inUI icon name.
       */
      icon: IconProps["svg"];
      /**
       * Default: false |
       * Set the component state to active
       */
      active?: boolean;
      /**
       * Specifies the text to show as content header
       */
      label: string;
      /**
       * Default: null |
       * You can use this prop to send a string with your custom css classes.
       */
      className?: string;
    }
  >;

export interface DockContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: null |
   * You can use this prop to send a string with your custom css classes.
   */
  className?: string;
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
}

export interface ContentHeaderProps {
  /**
   * Specifies the text to show as content header
   */
  label: string;
  /**
   * Specifies if content component has children
   */
  hasChildren?: boolean;
}
export interface ContentChildrenProps {
  /**
   * The classic React children prop.
   */
  children?: ReactNode;
}

export type DockGroupType = typeof DockWrapper & {
  Item: typeof DockItem;
};
