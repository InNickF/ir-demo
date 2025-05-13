import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useEditDealChoices } from "@/acquisitions/services/queries/filters";

export const MarketSelect = <
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>(
  props: GenericControlledSelectProps<Options, IsMulti, FieldValues>
) => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  const options =
    dealChoices?.find((filter) => filter.key === "market")?.options || [];

  return (
    <GenericControlledSelect
      {...props}
      loading={isFiltersLoading}
      options={options as Options[]}
    />
  );
};
