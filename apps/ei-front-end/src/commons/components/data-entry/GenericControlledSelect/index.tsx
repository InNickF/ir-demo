import { GenericLabelValueObject, IsLoadingProp } from "@/commons/typings";
import { Select, SelectProps } from "in-ui-react";
import { InputsColor } from "in-ui-react/dist/lib/components/utils/types";
import { Control, Controller, Path, UseControllerProps } from "react-hook-form";

export type GenericControlledSelectValue =
  | {
      [key: string]: { [key: string]: string | number | null };
    }
  | unknown;
export interface GenericControlledSelectProps<
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
> extends SelectProps<Options, IsMulti>,
    IsLoadingProp {
  identifier: Path<FieldValues>;
  rules?: UseControllerProps<FieldValues>["rules"];
  control: Control<FieldValues, unknown>;
  color?: InputsColor;
  onChange?: (option: unknown) => void;
}

export function GenericControlledSelect<
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>({
  identifier,
  rules,
  control,
  label,
  placeholder,
  options,
  error,
  color,
  onChange,
  ...props
}: GenericControlledSelectProps<Options, IsMulti, FieldValues>) {
  return (
    <Controller
      render={({ field: { value } }) => {
        const selectValue = () => {
          if (typeof value !== "object") {
            const option = options?.find(
              (option: GenericLabelValueObject) => option.value === value
            ) as Options;

            return option || null;
          }
          return value || null;
        };
        return (
          <Select
            {...props}
            label={label}
            placeholder={placeholder}
            options={options}
            value={selectValue()}
            onChange={onChange}
            error={error}
            color={color}
            required={!!rules?.required}
          />
        );
      }}
      name={identifier}
      control={control}
      rules={rules}
    />
  );
}
