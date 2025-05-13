import { useAssetsFilters } from "@/modules/assets/services/queries/filters";
import {
  FilterType,
  SelectFilterType,
  TextFilterType,
  useFilters,
} from "in-ui-react";
import { useMemo } from "react";

interface UseFundsPageFiltersParams {
  validFilters?: string[];
  ignoredFilters?: string[];
}
export const useFundsPageFilters = (
  {
    ignoredFilters = [],
    validFilters = ["status"],
  }: UseFundsPageFiltersParams = {
    ignoredFilters: [],
    validFilters: ["status"],
  }
) => {
  const defaultFilters = {
    search: "",
    status: "active",
  };
  const { filteredOptions, onApply } = useFilters(defaultFilters);
  const { data: filters, isLoading: isLoadingFilters } = useAssetsFilters();
  const memoFilters: FilterType[] = useMemo(() => {
    const apiFilters =
      filters
        ?.filter(
          (filter) =>
            validFilters.includes(filter.key) &&
            !ignoredFilters.includes(filter.key)
        )
        ?.map(
          (filter) =>
            ({
              ...filter,
              type: "simple-select",
            } as SelectFilterType)
        ) || [];

    const searchFilter = {
      key: "search",
      name: "Search",
      type: "text",
    } as TextFilterType;

    return [
      ...(!ignoredFilters.includes("search") ? [searchFilter] : []),
      ...apiFilters,
    ];
  }, [filters, ignoredFilters, validFilters]);

  return {
    filteredOptions,
    onApply,
    UIFilters: memoFilters,
    filters,
    isLoadingFilters,
    defaultFilters,
  };
};
