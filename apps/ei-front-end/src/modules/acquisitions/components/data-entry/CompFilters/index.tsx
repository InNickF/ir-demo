import { FromToDateInputs } from "@/commons/components/data-entry/FromToDateInputs";
import { FromToInputs } from "@/commons/components/data-entry/FromToInputs";
import { IsLoadingProp } from "@/commons/typings";
import { preventNonNumericalInput } from "@/commons/utils";
import {
  FilterType,
  Filters,
  FiltersPayloadType,
  OptionType,
} from "in-ui-react";
import { FC, useMemo } from "react";
import { AgeYearInputs } from "./components/CompsAgeFilter";

interface CompFiltersProps extends IsLoadingProp {
  filteredOptions: FiltersPayloadType;
  onApply: (filter: FiltersPayloadType) => void;
  extraFilters?: FilterType<OptionType>[];
  onClear?: () => void;
  hideTitle?: boolean;
  showApplyButton?: boolean;
  className?: string;
}
export const CompFilters: FC<CompFiltersProps> = ({
  filteredOptions,
  onApply,
  isLoading,
  extraFilters = [],
  hideTitle = false,
  onClear,
  showApplyButton = true,
  className,
}) => {
  const filters: FilterType<OptionType>[] = useMemo(() => {
    return [
      {
        key: "sf",
        name: "SF",
        type: "custom",
        render: ({ filter, filteredOptions, onApply, onClear, isLoading }) => (
          <FromToInputs
            accessor={filter.key}
            filteredOptions={filteredOptions}
            fromName={`from_${filter.key}`}
            toName={`to_${filter.key}`}
            onApply={onApply}
            isLoading={isLoading}
            onClear={onClear}
            type="number"
            pattern="[0-9]*"
            onKeyDown={(e) => {
              preventNonNumericalInput(e);
            }}
            showApplyButton={showApplyButton}
          />
        ),
      },
      {
        key: "price",
        name: "Price",
        type: "custom",
        render: ({ filter, filteredOptions, onApply, onClear, isLoading }) => (
          <FromToInputs
            accessor={filter.key}
            filteredOptions={filteredOptions}
            fromName={`from_${filter.key}`}
            toName={`to_${filter.key}`}
            onApply={onApply}
            isLoading={isLoading}
            onClear={onClear}
            type="number"
            pattern="[0-9]*"
            onKeyDown={(e) => {
              preventNonNumericalInput(e);
            }}
            showApplyButton={showApplyButton}
          />
        ),
      },
      {
        key: "age",
        name: "Age",
        type: "custom",
        render: ({ filteredOptions, onApply, isLoading, onClear, filter }) => {
          return (
            <AgeYearInputs
              accessor={filter.key}
              filteredOptions={filteredOptions}
              fromName={`from_${filter.key}`}
              toName={`to_${filter.key}`}
              onApply={onApply}
              isLoading={isLoading}
              onClear={onClear}
              showApplyButton={showApplyButton}
            />
          );
        },
      },
      {
        key: "date",
        name: "Date",
        type: "custom",
        render: ({ filteredOptions, onApply, isLoading, onClear }) => {
          return (
            <FromToDateInputs
              onApply={onApply}
              filteredOptions={filteredOptions}
              isLoading={isLoading}
              onClear={onClear}
              showApplyButton={showApplyButton}
            />
          );
        },
      },
      ...extraFilters,
    ];
  }, [extraFilters, showApplyButton]);

  return (
    <Filters
      className={className}
      filters={filters}
      filteredOptions={filteredOptions}
      onApply={(filters) => onApply(filters)}
      kind="glass"
      isLoading={isLoading}
      hideTitle={hideTitle}
      onClear={onClear}
    />
  );
};
