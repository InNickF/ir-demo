import { useCallback, useState } from "react";
import { useGeneralFiltersAppliedEvent } from "@/commons/events/generalFiltersApplied";

export const usePagination = () => {
  const [page, setPage] = useState(1);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  useGeneralFiltersAppliedEvent({ onEvent: resetPagination });

  return { page, setPage };
};
