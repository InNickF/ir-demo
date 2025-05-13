import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useDealBrokerCompanyChoices } from "../queries/useDealBrokerCompanyChoices";

export const BrokerSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { options, isFiltersLoading } = useDealBrokerCompanyChoices();

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
