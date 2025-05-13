import { useDebtFilters } from "@/modules/debt/services/queries/filters";
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

export const GeneralDebtFilters: FC<SummaryFiltersProps> = ({
  onApply,
  filteredOptions,
  className,
  disabledKeys = [],
}) => {
  const { data: overviewFilters, isLoading } = useDebtFilters();

  const memoFilters: FilterType[] = useMemo(() => {
    const overviewFilterKeys = ["fund", "lender", "property", "status"];
    const enabledOverviewFilterKeys = overviewFilterKeys.filter(
      (key) => !disabledKeys.includes(key)
    );

    return (
      overviewFilters
        ?.filter((filter) => enabledOverviewFilterKeys.includes(filter.key))
        ?.map(
          (filter) =>
            ({
              ...filter,
              type: "simple-select",
              unDeletable: true,
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
