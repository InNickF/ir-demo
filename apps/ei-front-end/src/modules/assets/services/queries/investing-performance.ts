import {
  DistributionsContributionsKPIsFilters,
  NetContributionDistributionChartFilters,
  TotalDistributionActualLineChartFilters,
  TotalDistributionBudgetLineChartFilters,
  PropertyTotalDistributionByTypeDoughnutFilters,
} from "@/assets/services/api/investing-performance";
import { queries } from "@/assets/services/keys";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const useDistributionsContributionsKPIs = (
  filters: DistributionsContributionsKPIsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.investingPerformance.distributionsContributionsKPIs(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Distributions / Contributions",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.investment_entity_code || !!filters?.investment_fund_name,
  });
};

export const usePropertyNetContributionDistributionChart = (
  filters: NetContributionDistributionChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.investingPerformance.netContributionDistributionChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Net Contribution Distribution",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.investment_entity_code || !!filters?.investment_fund_name,
  });
};

export const usePropertyTotalDistributionByTypeDoughnut = (
  filters: PropertyTotalDistributionByTypeDoughnutFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.investingPerformance.propertyTotalDistributionByTypeDoughnut(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Total Distribution By Type",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.investment_entity_code || !!filters?.investment_fund_name,
  });
};

export const useTotalDistributionActualLineChart = (
  filters: TotalDistributionActualLineChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.investingPerformance.totalDistributionActualLineChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Total Distribution Actual",
        }),
        message: parseError(error),
      });
    },
    enabled:
      !!filters?.investment_entity_code || !!filters?.investment_fund_name,
  });
};

export const useTotalDistributionBudgetLineChart = (
  filters: TotalDistributionBudgetLineChartFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.investingPerformance.totalDistributionBudgetLineChart(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Total Distribution Budget",
        }),
        message: parseError(error),
      });
    },
    enabled: !!filters?.fund_name || !!filters?.yardi_property_code,
  });
};
