import { HTMLAttributes } from "react";
import { PageHeaderWrapper } from ".";
import { Item } from "./components/Item";
import { IconProps } from "../../general/Icon/props";
import { AsElement, PolymorphicComponentPropWithRef } from "../../utils/types";

type MenuProps =
  | {
      /**
       * Default: null |
       * Elements to render in the menu section.
       */
      menu: JSX.Element;
      /**
       * Default: false |
       * Specifies if the fixed menu hides.
       */
      drawerIsOpen: boolean;
      /**
       * Default: undefined |
       * Specifies close drawer action
       */
      closeDrawer: () => void;
      /**
       * Default: undefined |
       * Specifies open drawer action
       */
      openDrawer: () => void;
    }
  | {
      menu?: null;
      drawerIsOpen?: never;
      closeDrawer?: never;
      openDrawer?: never;
    };

export interface PageHeaderCommonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: false |
   * Specifies if the container will fill the total width of the horizontal viewport.
   */
  fluid?: boolean;
  /**
   * Default: false |
   * Specifies if the fixed menu hides.
   */
  noFixed?: boolean;
}

export type PageHeaderProps = MenuProps & PageHeaderCommonProps;

export type HeaderContentProps = Pick<PageHeaderProps, "fluid" | "children">;

export type HeaderMenuProps = Pick<
  PageHeaderProps,
  "fluid" | "menu" | "className" | "openDrawer"
>;

export type HeaderMenuMobileProps = Pick<PageHeaderProps, "openDrawer">;

export type HeaderFixedMenuProps = Pick<
  PageHeaderProps,
  "menu" | "noFixed" | "openDrawer" | "fluid" | "className"
>;

export type HeaderDrawerProps = Pick<
  PageHeaderProps,
  "menu" | "drawerIsOpen" | "closeDrawer"
>;

export type PageHeaderItemProps<C extends AsElement> =
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
      icon?: IconProps["svg"];
      /**
       * Default: false |
       * Set the component state to active
       */
      active?: boolean;
    }
  >;

export type PageHeaderGroupType = typeof PageHeaderWrapper & {
  Item: typeof Item;
};
