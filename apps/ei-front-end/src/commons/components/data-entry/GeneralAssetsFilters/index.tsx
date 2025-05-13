import { useAssetsFilters } from "@/modules/assets/services/queries/filters";
import {
  FilterType,
  Filters,
  FiltersPayloadType,
  SelectFilterType,
} from "in-ui-react";
import { FC, useMemo } from "react";

interface SummaryFiltersProps {
  onApply: (filter: FiltersPayloadType) => void;
  filteredOptions: FiltersPayloadType;
  className?: string;
  disabledKeys?: string[];
}

export const GeneralAssetsFilters: FC<SummaryFiltersProps> = ({
  onApply,
  filteredOptions,
  className,
  disabledKeys = [],
}) => {
  const { data: overviewFilters, isLoading } = useAssetsFilters();

  const memoFilters: FilterType[] = useMemo(() => {
    const overviewFilterKeys = [
      "fund",
      "lender",
      "property",
      "status",
      // "region",
    ];
    return (
      overviewFilters
        ?.filter(
          (filter) =>
            overviewFilterKeys.includes(filter.key) &&
            !disabledKeys.includes(filter.key)
        )
        ?.map(
          (filter) =>
            ({
              ...filter,
              type: "simple-select",
            } as SelectFilterType)
        ) || []
    );
  }, [overviewFilters, disabledKeys]);

  return (
    <div className={className}>
      <Filters
        filters={memoFilters || []}
        filteredOptions={filteredOptions}
        onApply={(filters) => onApply(filters)}
        isLoading={isLoading}
        autoInitialFocus={false}
      />
    </div>
  );
};
