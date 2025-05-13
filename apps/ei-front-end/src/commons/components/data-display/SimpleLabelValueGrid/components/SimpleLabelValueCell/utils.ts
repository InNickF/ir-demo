import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";

interface ValueFormatterParams {
  value: string;
  mustShowRawValue?: boolean;
}
interface ValueFormatterReturnType {
  formattedValue: string;
  isLongTextValue: boolean;
}
type GetFormattedValueFn = (
  params: ValueFormatterParams
) => ValueFormatterReturnType;

export const getFormattedValue: GetFormattedValueFn = ({
  value,
  mustShowRawValue,
}) => {
  const isLongTextValue = value?.length > 50;

  if (mustShowRawValue) {
    return { formattedValue: value, isLongTextValue };
  }

  const formattedValue =
    value === ""
      ? "N/A"
      : isLongTextValue
      ? slicedTextWithEllipsis({
          text: value,
          maxLength: 20,
        })
      : value;

  return { formattedValue, isLongTextValue };
};
