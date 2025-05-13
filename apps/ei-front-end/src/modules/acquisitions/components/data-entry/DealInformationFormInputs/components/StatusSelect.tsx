import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useDealStatusChoices } from "../queries/useDealStatusChoices";

export const StatusSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { options, isFiltersLoading } = useDealStatusChoices();

  const getSelectDefaultValue = () => {
    if (!props?.defaultValue) return null;
    const value =
      typeof props?.defaultValue === "string"
        ? options.find((option) => option.value === props?.defaultValue)
        : props?.defaultValue;
    return value;
  };

  return (
    <GenericControlledSelect
      {...props}
      loading={isFiltersLoading}
      options={options as Options[]}
      defaultValue={getSelectDefaultValue()}
    />
  );
};
