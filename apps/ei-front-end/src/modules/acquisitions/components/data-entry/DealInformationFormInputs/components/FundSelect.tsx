import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useFundChoices } from "../queries/useFundChoices";

export const FundSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>({
  isLoading,
  ...props
}: GenericControlledSelectProps<Options, IsMulti, FieldValues>) => {
  const { isFiltersLoading, options } = useFundChoices();
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
      loading={isFiltersLoading || isLoading}
      options={options as Options[]}
      defaultValue={getSelectDefaultValue()}
    />
  );
};
