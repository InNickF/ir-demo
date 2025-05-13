import { Checkbox, CheckboxProps } from "in-ui-react";
import { ChangeEvent } from "react";
import { Control, Controller, Path, UseControllerProps } from "react-hook-form";

export interface GenericControlledCheckboxProps<FieldValues>
  extends CheckboxProps {
  identifier: Path<FieldValues>;
  rules?: UseControllerProps<FieldValues>["rules"];
  control: Control<FieldValues, unknown>;
  onChange: (arg: ChangeEvent<HTMLInputElement>) => void;
}
type GenericControlledCheckboxComponent = <FieldValues>(
  props: GenericControlledCheckboxProps<FieldValues>
) => React.ReactElement | null;

export const GenericControlledCheckbox: GenericControlledCheckboxComponent = ({
  identifier,
  rules,
  control,
  onChange,
  ...props
}) => {
  return (
    <Controller
      render={({ field: { value } }) => (
        <Checkbox
          checked={value as boolean}
          onChange={onChange}
          {...props}
          required={!!rules?.required}
        />
      )}
      name={identifier}
      control={control}
      rules={rules}
    />
  );
};
