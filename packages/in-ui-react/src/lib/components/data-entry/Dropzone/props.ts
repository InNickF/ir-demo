import { HTMLAttributes } from "react";
import { DropzoneOptions, DropzoneState } from "react-dropzone";
import { IconProps } from "../../general/Icon/props";

export interface DropzoneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Dropzone options from react-dropzone.
   */
  options: DropzoneOptions;
  /**
   * Default: "Drag and drop your files here, or click to select files." |
   * Dropzone hint.
   */
  hint?: string;
  /**
   * Default: "folder-plus" |
   * Dropzone icon.
   */
  icon?: IconProps["svg"];
  /**
   * Default: undefined |
   * Dropzone render prop children, it gives you dropzoneState from react-dropzone.
   */
  children?: (dropzoneState: DropzoneState) => JSX.Element;
  /**
   * Default: undefined |
   * Error message.
   */
  error?: string | false | undefined;
}
