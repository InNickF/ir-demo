import { useEditDealChoices } from "@/acquisitions/services/queries/filters";
import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";

export const AnalystSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  const options =
    dealChoices?.find((filter) => filter.key === "analyst")?.options || [];

  return (
    <GenericControlledSelect
      {...props}
      loading={isFiltersLoading}
      options={options as Options[]}
    />
  );
};
