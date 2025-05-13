import { useCallback, useState } from "react";
import { FiltersPayloadType } from "../props";

export const useFilters = <T extends FiltersPayloadType>(
  initialFilters?: T
) => {
  const [filteredOptions, setFilteredOptions] = useState<T>(
    initialFilters || ({} as T)
  );

  const onApply = useCallback(
    (filter: T) => {
      setFilteredOptions(filter);
    },
    [setFilteredOptions]
  );

  const deleteAllFilters = useCallback(() => {
    setFilteredOptions({} as T);
  }, [setFilteredOptions]);

  return {
    filteredOptions,
    onApply,
    deleteAllFilters,
  };
};
