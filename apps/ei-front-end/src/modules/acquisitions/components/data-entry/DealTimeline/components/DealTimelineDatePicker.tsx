import { ExtendedDealInformationWithFilesAndTimeline } from "@/acquisitions/typings/deals";
import { Input, InputProps } from "in-ui-react";
import { FC } from "react";
import { Control, Controller, Path, ValidationRule } from "react-hook-form";

interface DealTimelineDatePickerProps {
  control: Control<ExtendedDealInformationWithFilesAndTimeline, unknown>;
  name: Path<Pick<ExtendedDealInformationWithFilesAndTimeline, "timeline">>;
  required?: string | ValidationRule<boolean>;
  type?: InputProps["type"];
  color?: InputProps["color"];
  error?: InputProps["error"];
}
export const DealTimelineDatePicker: FC<DealTimelineDatePickerProps> = ({
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
