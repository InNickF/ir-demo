import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";
import { convertToTitleCase } from "../model-in/formatters/utils";
import { humanizeSnakeAndKeepCase } from "../model-in/formatters/utils";

interface UseButtonGroupFiltersParams<T extends string> {
  filters: T[];
}
/**
 * Hook to manage button group filters
 * @param filters Array of filters
 * @returns currentActiveFilter, items and classes
 * @example
 * const { filter, items, classes } = useButtonGroupFilters({
 *  filters: ["risk", "refi"],
 * });
 *
 */
export const useButtonGroupFilters = <T extends string>({
  filters,
}: UseButtonGroupFiltersParams<T>) => {
  const [currentActiveFilter, setCurrentActiveFilter] = useState<
    typeof filters[number]
  >(filters[0]);
  const items: ButtonGroupItem[] = filters.map((filter) => ({
    key: filter,
    text: convertToTitleCase(humanizeSnakeAndKeepCase(filter)),
    onClick: (key) => setCurrentActiveFilter(key as T),
  }));

  const isHidden = (selectedFilter: typeof filters[number]) =>
    currentActiveFilter === selectedFilter ? undefined : "hidden";

  return {
    currentActiveFilter,
    items,
    isHidden,
    setCurrentActiveFilter,
  };
};
