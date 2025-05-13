import { Input, InputProps } from "in-ui-react";
import { FC } from "react";
import { Control, Controller, Path, ValidationRule } from "react-hook-form";

interface AsOfMonthDatePickerProps
  extends Pick<InputProps, "error" | "color" | "type" | "label" | "disabled"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: Path<Pick<any, any>>;
  required?: string | ValidationRule<boolean>;
}
export const AsOfMonthDatePicker: FC<AsOfMonthDatePickerProps> = ({
  control,
  name,
  required,
  type = "date",
  color = "over-ghost",
  ...props
}) => (
  <Controller
    control={control}
    name={name}
    rules={{ required }}
    render={({ field: { onChange, value } }) => {
      const regexMMDDYYYY =
        /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

      const isMMDDYYDate = regexMMDDYYYY.test(value as string);

      const date = isMMDDYYDate
        ? new Date(value as string).toISOString().substring(0, 10)
        : value;

      return (
        <Input
          type={type}
          color={color}
          value={date as string}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...props}
        />
      );
    }}
  />
);
