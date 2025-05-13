import { forwardRef, useId, FormEvent, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { humanizeFileSize } from "../../utils/files";
import { setComponentRefs } from "../../utils/refs";
import { UploadButtonProps } from "./props";
import { Button } from "../../general/Button";
import "./styles.css";
import { HelperText } from "../HelperText";

/**
 * In UI Upload Button Component
 * @see {@link https://todo.com/} for official documentation.
 * @param children
 * Default: undefined |
 * @oaram state
 * Upload button state
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param buttonProps
 * Default: undefined |
 * You can use this prop to send a object with your custom button props.
 * @param error
 * Default: undefined |
 * Error message (string).
 * @interface UploadButtonProps
 * This is the custom interface created for this component logic.
 * @interface InputHTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Upload Input react component
 */
export const UploadButton = forwardRef<HTMLInputElement, UploadButtonProps>(
  (
    {
      name,
      id,
      state,
      className,
      buttonProps,
      children,
      onChange,
      canDelete = true,
      error = undefined,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-upload-button";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];

      className && classes.push(className);
      return classes.join(" ");
    };

    const uniqueId = useId();
    const getId = () => {
      if (id) {
        return id;
      }
      if (!id && name) {
        return name;
      }
      return uniqueId;
    };

    const removeItem = (i: number) => {
      state.setFiles(state.files.filter((item, index) => i !== index));
    };

    const FileList = (): JSX.Element => {
      return (
        <>
          {state.files.length > 0 && (
            <div className={`${prefix}__file-list`}>
              {state.files.map((file: File, i) => {
                return (
                  <div className={`${prefix}__file-list__item`} key={i}>
                    {canDelete ? (
                      <button
                        className={`${prefix}__file-list__item__delete-icon`}
                        onClick={() => removeItem(i)}
                      >
                        <XMarkIcon />
                      </button>
                    ) : null}
                    <div className={`${prefix}__file-list__item__description`}>
                      <div
                        className={`${prefix}__file-list__item__description__filename`}
                      >
                        {file.name}
                      </div>
                      <div
                        className={`${prefix}__file-list__item__description__size`}
                      >
                        ({humanizeFileSize(file.size)})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      );
    };

    const setFiles = (event: FormEvent): void => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        state.setFiles([...files]);
      }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const UploadButtonError = () => {
      return (
        <>
          {error && (
            <div className="acq-download-upload-error_container">
              <HelperText color="error">{error}</HelperText>
            </div>
          )}
        </>
      );
    };

    return (
      <div className={getClasses()}>
        <Button
          {...buttonProps}
          as="button"
          onClick={() => inputRef?.current?.click()}
        >
          {children}
        </Button>
        <FileList />
        <input
          id={getId()}
          name={name}
          ref={setComponentRefs(inputRef, ref)}
          type="file"
          className={`${prefix}__input`}
          onChange={(event) => {
            setFiles(event);
            onChange && onChange(event);
          }}
          {...props}
        />
        <UploadButtonError />
      </div>
    );
  }
);

UploadButton.displayName = "UploadButton";
