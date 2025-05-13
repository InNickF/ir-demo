import { InputHTMLAttributes } from "react";
import { ButtonProps } from "../../general/Button/props";
import { UploadButtonState } from "./hooks";

export interface UploadButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Specifies the state for the component
   */
  state: UploadButtonState;
  /**
   * Button props
   * All the props that the button component can receive
   */
  buttonProps?: Omit<ButtonProps<"button">, "as" | "onClick">;
  /*
   * Specifies if the file can be deleted
   */
  canDelete?: boolean;
  /**
   * Default: undefined |
   * Error message.
   */
  error?: string | false | undefined;
}
