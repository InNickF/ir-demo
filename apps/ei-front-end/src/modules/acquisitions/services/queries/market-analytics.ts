import { Comp, CompTotals } from "@/acquisitions/typings/market-analytics";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { cleanEmptyObjectValues, notificationMessages } from "@/commons/utils";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useMemo } from "react";
import {
  CompstackLeaseCompsTrendChartFilters,
  GetAllCompstackCompsFilters,
  GetCompstackCompTotalsFilters,
  GetCompstackCompsFilters,
  GetCompstackLandCompsTrendFilters,
  GetCompstackSaleCompsTrendFilters,
  GetDealDrivingRoutesFilters,
  GetDealCustomerAccessFilters,
  GetFinancialMarketForwardCurvesFilters,
  GetHistoricalMacroEconomicIndicatorsChartFilters,
  GetHistoricalMarketOrSubMarketStatisticsChartFilters,
  GetHistoricalMarketStatisticsChartFilters,
  GetHistoricalMarketStatisticsChartSupplyVSDemandFilters,
  GetIndustrialGeographiesByLatitudeAndLongitudeFilters,
  GetIndustrialGeographiesFilters,
  GetMarketAnalyticsKPIsFilters,
  GetMarketRentGrowthAndForecastChartFilters,
  GetPropertiesWarehousesFilters,
  getCompTotalsByType,
  getCompsByType,
  GetHistoricalCapRatesFilters,
} from "../api/market-analytics";
import { queries } from "../keys";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
const { subjectErrorCRUD } = notificationMessages;

export const useComps = (filters: GenericFilterPayload = {}) => {
  return useQuery({
    ...queries.marketAnalytics.all(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
  });
};

export const useCompsByType = <T extends Comp>(
  filters: GenericFilterPayload & { type: T["type"] }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.byType(cleanEmptyObjectValues(filters)),
    queryFn: () => getCompsByType<T>(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `comp by type: ${filters.type}`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.type,
  });
};

export const useCompTotals = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.totals(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "comp totals" }),
        message: parseError(error),
      });
    },
  });
};

export const useCompTotalsByType = <T extends CompTotals>(
  filters: GenericFilterPayload & { type: Comp["type"] }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.byType(cleanEmptyObjectValues(filters)),
    queryFn: () => getCompTotalsByType<T>(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `comp totals by type: ${filters.type}`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const useMarketAnalyticsKPIs = (
  filters: GetMarketAnalyticsKPIsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.marketAnalyticsKPIs(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `market analytics KPIs: ${
            filters?.submarket || filters?.market
          }`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.submarket || !!filters?.market,
  });
};

export const useCompstackLeaseCompsTrend = (
  filters: CompstackLeaseCompsTrendChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.compstackLeaseCompsTrendChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `market rent chart: ${filters?.x_axis} ${filters?.y_axis}`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      (!!filters?.x_axis && !!filters?.y_axis && !!filters?.market) ||
      (!!filters?.x_axis && !!filters?.y_axis && !!filters?.submarket),
  });
};

export const useCompstackSaleCompsTrend = (
  filters: GetCompstackSaleCompsTrendFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.compstackSaleCompsTrendChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack sale comps trend chart.`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.market || !!filters?.submarket,
  });
};

export const useCompstackLandCompsTrend = (
  filters: GetCompstackLandCompsTrendFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.compstackLandCompsTrendChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack land comps trend chart.`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.market || !!filters?.submarket,
  });
};

export const useHistoricalMarketOrSubMarketStatisticsChart = (
  filters: GetHistoricalMarketOrSubMarketStatisticsChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.historicalMarketOrSubMarketStatisticsChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `historical market statistics chart: ${
            filters?.type
          } of market: ${filters?.submarket || filters?.market}`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      (!!filters?.type && !!filters?.submarket) ||
      (!!filters?.type && !!filters?.market),
  });
};

export const useHistoricalMarketStatisticsChart = (
  filters: GetHistoricalMarketStatisticsChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.historicalMarketStatisticsChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `historical market statistics chart: ${filters?.type} of market: ${filters?.market}`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.type && !!filters?.market,
  });
};

export const useHistoricalMarketStatisticsChartSupplyVSDemand = (
  filters: GetHistoricalMarketStatisticsChartSupplyVSDemandFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.historicalMarketStatisticsChartSupplyVSDemand(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `historical market statistics chart supply vs. demand.`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const useHistoricalMacroEconomicIndicatorsChart = (
  filters: GetHistoricalMacroEconomicIndicatorsChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.historicalMacroEconomicIndicatorsChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `historical macroeconomic indicators chart: ${
            filters?.type
          } of market: ${filters?.submarket || filters?.market}`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      (!!filters?.type && !!filters?.submarket) ||
      (!!filters?.type && !!filters?.market),
  });
};

export const useCompstackLeaseComps = (filters: GetCompstackCompsFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.compstackLeaseComps(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack lease comps`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.market ||
      !!filters?.submarket ||
      (!!filters?.distance && !!filters?.latitude && !!filters?.longitude),
  });
};

export const useCompstackSalesComps = (filters: GetCompstackCompsFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.compstackSalesComps(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack sales comps`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.market ||
      !!filters?.submarket ||
      (!!filters?.distance && !!filters?.latitude && !!filters?.longitude),
  });
};

export const useCompstackLandComps = (filters: GetCompstackCompsFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.compstackLandComps(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack land comps`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.market ||
      !!filters?.submarket ||
      (!!filters?.distance && !!filters?.latitude && !!filters?.longitude),
  });
};

export const useAllCompstackComps = (filters: GetAllCompstackCompsFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.allCompstackComps(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack comps`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      (!!filters?.type && !!filters?.market) ||
      (!!filters?.type && !!filters?.submarket) ||
      (!!filters?.distance && !!filters?.latitude && !!filters?.longitude),
  });
};

export const useCompstackLeaseCompTotals = (
  filters: GetCompstackCompTotalsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.marketAnalytics.compstackLeaseCompTotals(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack lease comps totals`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const useCompstackSaleCompTotals = (
  filters: GetCompstackCompTotalsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.marketAnalytics.compstackSaleCompTotals(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack sale comps totals`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const useCompstackLandCompTotals = (
  filters: GetCompstackCompTotalsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.marketAnalytics.compstackLandCompTotals(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `compstack land comps totals`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const usePropertiesWarehouses = (
  filters: GetPropertiesWarehousesFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.propertiesWarehouses(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `properties (warehouses)`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.market ||
      !!filters?.submarket ||
      (!!filters?.distance && !!filters?.latitude && !!filters?.longitude),
  });
};

export const useFinancialMarketForwardCurves = (
  filters: GetFinancialMarketForwardCurvesFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.financialMarketForwardCurves(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `financial market forward curves: ${filters?.type}`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.type,
  });
};

export const useIndustrialGeographies = <T extends boolean = false>(
  filters: GetIndustrialGeographiesFilters<T>
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.industrialGeographies(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `industrial geographies`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.market || !!filters?.submarket,
  });
};

export const useIndustrialGeography = <T extends boolean = false>(
  filters: GetIndustrialGeographiesFilters<T>
) => {
  const { data, ...query } = useIndustrialGeographies(filters);
  const selectedMarketData = useMemo(() => {
    return (
      data?.results?.find(
        (market) =>
          market.properties.geography_name === filters?.market ||
          market.properties.geography_name === filters?.submarket
      ) || null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    data: selectedMarketData,
    ...query,
  };
};

export const useIndustrialGeographiesByLatitudeAndLongitude = <
  T extends boolean = false
>(
  filters: GetIndustrialGeographiesByLatitudeAndLongitudeFilters<T>
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.industrialGeographiesByLatitudeAndLongitude(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `industrial geographies`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters.latitude && !!filters.longitude && !!filters.type,
  });
};

export const useMarketRentGrowthAndForecastChart = (
  filters: GetMarketRentGrowthAndForecastChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.marketRentGrowthAndForecastChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `market rent growth and forecast chart`,
        }),
        message: parseError(error),
      });
    },
    enabled:
      (!!filters?.type && !!filters?.market) ||
      (!!filters?.type && !!filters?.submarket),
  });
};

export const useDealDrivingRoutes = (filters: GetDealDrivingRoutesFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.dealDrivingRoutes(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `deal driving routes`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.dealId,
  });
};

export const useDealCustomerAccess = (
  filters: GetDealCustomerAccessFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.dealCustomerAccess(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: "Error getting deal customer access",
        message: parseError(error),
      });
    },
    enabled: !!filters?.dealId,
  });
};

export const useHistoricalCapRates = (
  filters: GetHistoricalCapRatesFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.marketAnalytics.capHistoricalRates(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: "Error getting cap rates",
        message: parseError(error),
      });
    },
    enabled: !!filters?.market || !!filters?.submarket,
  });
};
