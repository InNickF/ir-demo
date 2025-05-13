import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  getAssetGrowthFilters,
  getAssetsFilters,
  getPortfolioGrowthFilters,
  getPortfolioSummaryFilters,
  getPropertySummaryFilters,
  legacyGetAssetGrowthFilters,
} from "../api/filters";
import { queries } from "../keys";

export const useLegacyAssetGrowthFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.legacyAssetGrowth,
    queryFn: () => legacyGetAssetGrowthFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "asset Growth (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const usePortfolioGrowthFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.portfolioGrowth,
    queryFn: () => getPortfolioGrowthFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "portfolio Growth (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const usePortfolioSummaryFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.portfolioSummary,
    queryFn: () => getPortfolioSummaryFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "portfolio summary (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const usePropertySummaryFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.propertySummary,
    queryFn: () => getPropertySummaryFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "property summary (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useAssetsFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.assets,
    queryFn: () => getAssetsFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "properties (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};

export const useAssetGrowthFilters = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.filters.assetGrowth,
    queryFn: () => getAssetGrowthFilters(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "asset Growth (filters)",
        }),
        message: parseError(error),
      });
    },
    staleTime: Infinity,
  });
};
