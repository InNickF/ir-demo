import { CustomFilterType, FilterType, OptionType } from "in-ui-react";
import { useMemo } from "react";
import { FromToDateInputs } from "../components/data-entry/FromToDateInputs";

interface IUseDateFiltersParams<T extends OptionType> {
  initialFilters: FilterType<T>[];
  isClearable?: boolean;
  unDeletable?: boolean;
  showApplyButton?: boolean;
}

export const useDateFilters = <T extends OptionType>({
  initialFilters,
  isClearable = false,
  unDeletable = false,
  showApplyButton = false,
}: IUseDateFiltersParams<T>) => {
  const filters = useMemo(() => {
    return [
      ...initialFilters,
      ...([
        {
          type: "custom",
          key: "date",
          name: "Date",
          unDeletable,
          render: ({ filteredOptions, onApply, isLoading, onClear }) => {
            return (
              <FromToDateInputs
                onApply={onApply}
                filteredOptions={filteredOptions}
                isLoading={isLoading}
                onClear={isClearable ? onClear : null}
                showApplyButton={showApplyButton}
              />
            );
          },
        },
      ] as CustomFilterType<{
        date: {
          from: string;
          to: string;
        };
      }>[]),
    ];
  }, [initialFilters, isClearable, unDeletable, showApplyButton]);
  return filters;
};
