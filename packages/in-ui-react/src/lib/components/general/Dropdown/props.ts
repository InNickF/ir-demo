import { HTMLAttributes } from "react";
import { MenuInitialState, MenuOptions } from "reakit/ts";
import { ButtonProps } from "../Button/props";

export interface DropdownItem
  extends Omit<ButtonProps<"button">, "as" | "children" | "kind" | "size"> {
  /**
   * Specifies text of the button.
   */
  text?: string;
  /**
   * Specifies the action triggered when the button is clicked.
   */
  onClick?: NonNullable<ButtonProps<"button">["onClick"]>;
}

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Items declaration.
   */
  items: DropdownItem[];
  /**
   * Specifies the disclosure element.
   */
  disclosure: JSX.Element;
  /**
   * Reakit menu options
   */
  menuProps?: MenuOptions & { onItemClick?: (item: DropdownItem) => void };
  /**
   * Reakit useMenuState options
   */
  dropdownInitialState?: MenuInitialState;
}
