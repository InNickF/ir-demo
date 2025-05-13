import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useValidationsChoices } from "@/modules/tools/services/queries/filters";

export const PropertySelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { data: validationChoices = [], isLoading: isFiltersLoading } =
    useValidationsChoices();

  const options =
    validationChoices?.find((filter) => filter.key === "property")?.options ||
    [];

  return (
    <GenericControlledSelect
      {...props}
      isLoading={isFiltersLoading}
      options={options as Options[]}
    />
  );
};
