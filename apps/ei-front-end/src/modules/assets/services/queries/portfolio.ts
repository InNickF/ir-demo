import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues, notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  GetARChartFilters,
  GetLoanExpirationFilters,
  GetPortfolioOFPHistoricalMetricsFilters,
  GetPortfolioOFPMetricsFilters,
  GetPortfolioOperationalStatementFilters,
} from "../api/portfolio";
import { queries } from "../keys";
const { subjectErrorCRUD } = notificationMessages;

export const useLegacyGetGavPortfolio = (
  filters: GenericFilterPayload = {},
  by?: string
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.legacyGavPortfolio(
      objectWithSomeValueOrNull({ ...filters, status: null }),
      by
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "portfolio gav with the filters",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useLegacyGetLeasePortfolio = (
  filters: GenericFilterPayload = {},
  by?: string
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.legacyLeasePortfolio(
      objectWithSomeValueOrNull(filters),
      by
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "portfolio lease with the filters",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useLegacyGetLoanPortfolio = (
  filters: GenericFilterPayload = {},
  by?: string
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.legacyLoanPortfolio(
      objectWithSomeValueOrNull(filters),
      by
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "portfolio loan with the filters",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetQuarterlyPortfolio = (
  filters: GenericFilterPayload = {},
  by?: string
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.quarterlyPortfolio(
      objectWithSomeValueOrNull(filters),
      by
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "portfolio quarterly with the filters",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetKpiPortfolio = (
  filters: GenericFilterPayload = {},
  by?: string
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.kpiPortfolio(objectWithSomeValueOrNull(filters), by),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "portfolio kpi with the filters",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useARChart = (filters: GetARChartFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.arChart(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "AR chart",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPortfolioOperationalFinancialPerformanceMetrics = (
  filters: GetPortfolioOFPMetricsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.operationalFinancialPerformanceMetrics(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Portfolio Operational Financial Performance Metrics",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPortfolioOperationalFinancialPerformanceHistoricalMetrics = (
  filters: GetPortfolioOFPHistoricalMetricsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.operationalFinancialPerformanceHistorical(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource:
            "Portfolio Operational Financial Performance Historical Metrics",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPortfolioOperationalStatement = (
  filters: GetPortfolioOperationalStatementFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.operationalStatement(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Portfolio Operational Statement",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetLoanExpiration = (filters: GetLoanExpirationFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.portfolio.loanExpiration(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Loan Expiration",
        }),
        message: parseError(error),
      });
    },
  });
};
