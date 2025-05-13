import { useCompFilters } from "@/acquisitions/services/queries/filters";
import {
  FilterType,
  Filters,
  FiltersPayloadType,
  OptionType,
} from "in-ui-react";
import { FC } from "react";

interface CompsFinderFiltersProps {
  onApply: (filter: FiltersPayloadType) => void;
  onClearFilters: () => void;
  filteredOptions: FiltersPayloadType;
}

export const CompsFinderFilters: FC<CompsFinderFiltersProps> = ({
  onApply,
  filteredOptions,
  onClearFilters,
}) => {
  const { data, isLoading } = useCompFilters();
  const compsFilters: FilterType<OptionType>[] =
    data?.map((filter) => {
      return { ...filter, type: "simple-select" } as FilterType<OptionType>;
    }) || [];

  return (
    <Filters
      filters={compsFilters}
      filteredOptions={filteredOptions}
      onApply={(filters) => onApply(filters)}
      kind="glass"
      isLoading={isLoading}
      onClear={onClearFilters}
      hideTitle
    />
  );
};
