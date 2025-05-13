import { FromToDateInputs } from "@/commons/components/data-entry/FromToDateInputs";
import { IsLoadingProp } from "@/commons/typings";
import {
  Filters,
  FiltersPayloadType,
  FilterType,
  OptionType,
} from "in-ui-react";
import { FC, useMemo } from "react";

interface OperationalFinancialPerformanceFiltersProps extends IsLoadingProp {
  filteredOptions: FiltersPayloadType;
  onApply: (filter: FiltersPayloadType) => void;
  onClear?: () => void;
  hideTitle?: boolean;
  showApplyButton?: boolean;
  className?: string;
  activeComparison: string;
  extraFilters?: FilterType<OptionType>[];
}
export const OperationalFinancialPerformanceFilters: FC<
  OperationalFinancialPerformanceFiltersProps
> = ({
  filteredOptions,
  onApply,
  isLoading,
  hideTitle = false,
  onClear,
  showApplyButton = true,
  className,
  activeComparison,
  extraFilters = [],
}) => {
  const baseFilters: FilterType<OptionType>[] = useMemo(
    () => [
      {
        key: "actual_period",
        name: "Actual Period",
        type: "custom",
        unDeletable: true,
        render: ({ filteredOptions, onApply, isLoading, onClear }) => {
          return (
            <FromToDateInputs
              onApply={onApply}
              accessor="actual_period"
              filteredOptions={filteredOptions}
              isLoading={isLoading}
              onClear={onClear}
              showApplyButton={showApplyButton}
            />
          );
        },
      },
    ],
    [showApplyButton]
  );

  const optionalFilters: FilterType<OptionType>[] = useMemo(
    () => [
      {
        key: "uw_period",
        name: "UW Period",
        type: "custom",
        unDeletable: true,
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
      {
        key: "other_period",
        name: "Other Period",
        type: "custom",
        unDeletable: true,
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
    ],
    [showApplyButton]
  );

  const finalFilters = useMemo(
    () => [
      ...baseFilters,
      ...optionalFilters.filter((item) => item.key === activeComparison),
      ...extraFilters,
    ],
    [baseFilters, optionalFilters, activeComparison, extraFilters]
  );

  return (
    <Filters
      className={className}
      filters={finalFilters}
      filteredOptions={filteredOptions}
      onApply={(filters) => onApply(filters)}
      isLoading={isLoading}
      autoInitialFocus={false}
      hideTitle={hideTitle}
      onClear={onClear}
      hideAddButton
    />
  );
};
