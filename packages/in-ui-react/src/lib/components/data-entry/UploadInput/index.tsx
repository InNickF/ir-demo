import { forwardRef } from "react";
import { InputProps } from "../Input/props";
import { Input } from "../Input";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import "./styles.css";

/**
 * In UI Upload Input Component
 * @see {@link https://todo.com/} for official documentation.
 * @param multiple
 * Default: false |
 * Allow input receive multiple files
 * @param accept
 * Default: null |
 * Can specify which type of files can be uploaded using Unique file type specifiers:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @interface HelperTextProps
 * This is the custom interface created for this component logic.
 * @interface InputHTMLAttributes
 * This interface is inherited from @types/react more info here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L1957
 * @returns
 * A inUI Upload Input react component
 */
export const UploadInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type" | "readOnly">
>(
  (
    {
      leftIcon = <PaperClipIcon />,
      multiple = false,
      accept,
      className,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-upload-input";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];

      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <Input
        leftIcon={leftIcon}
        type="file"
        readOnly
        accept={accept}
        multiple={multiple}
        ref={ref}
        className={getClasses()}
        {...props}
      />
    );
  }
);

UploadInput.displayName = "UploadInput";
