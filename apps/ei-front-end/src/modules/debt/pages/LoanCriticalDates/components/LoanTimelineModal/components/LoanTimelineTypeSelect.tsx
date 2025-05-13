import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useDebtFilters } from "@/modules/debt/services/queries/filters";

export const LoanTimelineTypeSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { data: debtChoices = [], isLoading: isFiltersLoading } =
    useDebtFilters();

  const options =
    debtChoices?.find((filter) => filter.key === "timelines_type")?.options ||
    [];

  return (
    <GenericControlledSelect
      {...props}
      loading={isFiltersLoading}
      options={options as Options[]}
    />
  );
};
