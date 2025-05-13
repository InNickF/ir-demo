import { useAssetsFilters } from "@/modules/assets/services/queries/filters";
import {
  FilterType,
  SelectFilterType,
  TextFilterType,
  useFilters,
} from "in-ui-react";
import { useMemo } from "react";

interface UsePagePropertyFiltersParams {
  validFilters?: string[];
  ignoredFilters?: string[];
}
export const usePagePropertyFilters = (
  {
    ignoredFilters = [],
    validFilters = ["fund", "status"],
  }: UsePagePropertyFiltersParams = {
    ignoredFilters: [],
    validFilters: ["fund", "status"],
  }
) => {
  const { filteredOptions, onApply } = useFilters({
    search: "",
    status: "",
    fund: "",
  });
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

    return [
      { key: "search", name: "Search", type: "text" } as TextFilterType,
      ...apiFilters,
    ];
  }, [filters, ignoredFilters, validFilters]);

  return {
    filteredOptions,
    onApply,
    UIFilters: memoFilters,
    filters,
    isLoadingFilters,
  };
};
