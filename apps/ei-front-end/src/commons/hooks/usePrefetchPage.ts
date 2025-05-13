import { useRouter } from "next/router";
import { useEffect } from "react";

interface PrefetchPageParams {
  url: string;
}

export const usePrefetchPage = ({ url }: PrefetchPageParams) => {
  const { prefetch } = useRouter();

  useEffect(() => {
    prefetch(url);
  }, [prefetch, url]);
};
