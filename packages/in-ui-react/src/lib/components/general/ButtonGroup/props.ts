import { HTMLAttributes } from "react";
import { Size } from "../../utils/types";
import { ButtonProps } from "../Button/props";

export interface ButtonGroupItem
  extends Omit<ButtonProps<"button">, "as" | "children" | "kind" | "onClick"> {
  /**
   * Specifies key of the button (used on active property).
   */
  key: string;
  /**
   * Specifies text of the button.
   */
  text: string;
  /**
   * Specifies the action triggered when the button is clicked.
   */
  onClick: (key: ButtonGroupItem["key"]) => void;
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specifies the key of the active button.
   */
  active?: ButtonGroupItem["key"];
  /**
   * Items declaration.
   */
  items: ButtonGroupItem[];
  /**
   * Allow buttons grow to fill the container.
   */
  flex?: boolean;
  /**
   * Size of the buttons.
   */
  size?: Size;
}
