import { useRouter } from "next/router";
import { useMemo } from "react";

export const useHasValidQueryParams = () => {
  const router = useRouter();
  const hasValidQueryParams = useMemo(() => {
    const { list_code, month, year, property } = router.query;
    return (list_code && month && year) || (property && month && year);
  }, [router.query]);

  return hasValidQueryParams;
};
