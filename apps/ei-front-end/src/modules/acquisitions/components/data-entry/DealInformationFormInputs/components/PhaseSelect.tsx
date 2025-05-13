import {
  GenericControlledSelect,
  GenericControlledSelectProps,
  GenericControlledSelectValue,
} from "@/commons/components/data-entry/GenericControlledSelect";
import { useEditDealChoices } from "@/acquisitions/services/queries/filters";
import { DealPhase } from "@/acquisitions/typings/deals";

export interface PhaseSelectProps<
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
> extends GenericControlledSelectProps<Options, IsMulti, FieldValues> {
  specificOptions?: DealPhase[];
}

export function PhaseSelect<
  Options,
  IsMulti extends boolean,
  FieldValues extends GenericControlledSelectValue
>({
  specificOptions,
  ...props
}: PhaseSelectProps<Options, IsMulti, FieldValues>) {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  let options =
    dealChoices?.find((filter) => filter.key === "phase")?.options || [];

  if (specificOptions) {
    options = options.filter((option) =>
      specificOptions.includes(option.value as DealPhase)
    );
  }

  return (
    <GenericControlledSelect
      {...props}
      loading={isFiltersLoading}
      options={options as Options[]}
    />
  );
}
