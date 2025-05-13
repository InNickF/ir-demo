import { Dropzone, DropzoneProps } from "in-ui-react";
import { Control, Controller, Path, UseControllerProps } from "react-hook-form";
import { DropzoneTag } from "./components/DropzoneTag";
export interface GenericControlledDropzoneProps<FieldValues> {
  identifier: Path<FieldValues>;
  rules?: UseControllerProps<FieldValues>["rules"];
  showTags?: boolean;
  control: Control<FieldValues, unknown>;
  onRemove?: (arg: File) => void;
  isMultiple?: boolean;
  options?: DropzoneProps["options"];
  onChange: (arg: File[]) => void;
  error?: DropzoneProps["error"];
}
type GenericControlledDropzoneComponent = <FieldValues>(
  props: GenericControlledDropzoneProps<FieldValues>
) => React.ReactElement | null;

export const GenericControlledDropzone: GenericControlledDropzoneComponent = ({
  identifier,
  rules,
  control,
  onRemove,
  showTags = false,
  options,
  isMultiple = false,
  error,
  onChange,
}) => {
  return (
    <Controller
      render={({ field: { value } }) => (
        <Dropzone
          error={error}
          options={{
            ...options,
            multiple: isMultiple,
            onDrop: (e) => {
              onChange(e);
            },
          }}
        >
          {() =>
            showTags ? (
              <div className="mt-2">
                <DropzoneTag
                  value={value as File | File[]}
                  onRemove={(file) => onRemove(file)}
                />
              </div>
            ) : null
          }
        </Dropzone>
      )}
      name={identifier}
      control={control}
      rules={rules}
    />
  );
};
