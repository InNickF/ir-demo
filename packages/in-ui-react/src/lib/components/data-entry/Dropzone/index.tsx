import { forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneProps } from "./props";
import { Icon } from "../../general/Icon";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import "./styles.css";
import { HelperText } from "../HelperText";

/**
 * In UI Dropzone Component
 * @see {@link https://todo.com/} for official documentation.
 * @param options
 * Dropzone options from react-dropzone.
 * @param hint
 * Default: "Drag and drop your files here, or click to select files." |
 * Dropzone hint.
 * @param icon
 * Default: "folder-plus" |
 * Dropzone icon.
 * @param children
 * Default: undefined |
 * Dropzone render prop children, it gives you dropzoneState from react-dropzone.
 * @interface DropzoneProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI Dropzone react component
 */
export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      options,
      hint = "Drag and drop your files here, or click to select files.",
      icon = <FolderPlusIcon />,
      className,
      children,
      error,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-dropzone";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      error && classes.push(`${prefix}--error`);
      className && classes.push(className);
      return classes.join(" ");
    };
    const dropzoneState = useDropzone(options);

    const DropzoneError = () => {
      return (
        <>
          {error && (
            <HelperText className={`${prefix}__error-helper`} color="error">
              {error}
            </HelperText>
          )}
        </>
      );
    };
    return (
      <section>
        <div
          ref={ref}
          {...props}
          {...dropzoneState.getRootProps({
            className: getClasses(),
          })}
        >
          <Icon svg={icon} specificSize="3rem" />
          <input {...dropzoneState.getInputProps()} />
          <p className={`${prefix}__text`}>{hint}</p>
        </div>
        {children ? (
          <div className={`${prefix}-content`}>{children(dropzoneState)}</div>
        ) : null}
        <DropzoneError />
      </section>
    );
  }
);

Dropzone.displayName = "Dropzone";
