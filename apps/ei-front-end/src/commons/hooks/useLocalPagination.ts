import { useCallback, useMemo, useState } from "react";
import { useGeneralFiltersAppliedEvent } from "../events/generalFiltersApplied";

interface UsePaginationResult<T> {
  currentPage: number;
  setPage: (page: number) => void;
  paginatedItems: T[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  originalItems: T[];
  totalPages: number;
  count: number;
}

interface UsePaginationParams<T> {
  itemsPerPage?: number | string;
  items: T[];
}

export const useLocalPagination = <T>({
  items = [],
  itemsPerPage = 10,
}: UsePaginationParams<T>): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPageNumber: number;

  if (typeof itemsPerPage === "string") {
    itemsPerPageNumber = parseInt(itemsPerPage);
  } else {
    itemsPerPageNumber = itemsPerPage;
  }

  if (itemsPerPageNumber === -1) {
    itemsPerPageNumber = items.length;
  }

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPageNumber);
  }, [items, itemsPerPageNumber]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPageNumber;
    const endIndex = startIndex + itemsPerPageNumber;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPageNumber]);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const setPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const resetPagination = useCallback(() => {
    setPage(1);
  }, [setPage]);

  useGeneralFiltersAppliedEvent({ onEvent: resetPagination });

  const count = items?.length;

  return {
    currentPage,
    setPage,
    paginatedItems,
    hasPreviousPage,
    hasNextPage,
    originalItems: items,
    totalPages,
    count,
  };
};
export const useLocalSearch = <T>({
  items,
  search,
  excludeSearchOnKeys = [],
}: {
  items: T[];
  search: string;
  excludeSearchOnKeys?: (keyof T)[];
}): T[] => {
  return useMemo(() => {
    if (!search) return items;

    const searchTerm = search.toString().toLowerCase();

    return items?.filter((item) =>
      Object.entries(item).some(
        ([key, value]) =>
          !excludeSearchOnKeys.includes(key as keyof T) &&
          String(value).toLowerCase().includes(searchTerm)
      )
    );
  }, [items, search, excludeSearchOnKeys]);
};
