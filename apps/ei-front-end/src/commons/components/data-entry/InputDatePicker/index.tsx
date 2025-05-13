import { Input, InputProps } from "in-ui-react";
import { FC } from "react";
import { transformDateToDatePicker } from "./utils";

const regexMMDDYYYY =
  /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

export interface InputDatePickerProps
  extends Omit<InputProps, "type" | "value"> {
  customFormat?: RegExp;
  value?: string;
}
export const InputDatePicker: FC<InputDatePickerProps> = ({
  value,
  customFormat = regexMMDDYYYY,
  ...props
}) => {
  const date = transformDateToDatePicker({ value, customFormat });

  return <Input type="date" value={date} {...props} />;
};
