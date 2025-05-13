import { getPropertiesURL } from "@/assets//utils/redirects/properties-redirects";
import { LegacyProperty, PropertyKpi } from "@/assets/typings/property";
import { useRedirectOn404 } from "@/commons/hooks/useRedirectOn404";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload, PaginatedResponse } from "@/commons/typings";
import { cleanEmptyObjectValues, notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  GetARPropertyTableFilters,
  GetAllPropertiesFilters,
  GetAssetLeaseExpirationPortraitFilters,
  GetAssetRentRollFilters,
  GetAssetStakingPlanFilters,
  GetAssetTotalDistributionsByTypeFilters,
  GetAssetTotalDistributionsByTypeTotalsFilters,
  GetPropertiesGeographyFilters,
  GetPropertyAttachments,
  GetPropertyComments,
  GetPropertyDebtMetricsFilters,
  GetPropertyFilters,
  GetPropertyOFPHistoricalMetricsFilters,
  GetPropertyOFPMetricsFilters,
  GetPropertyStrategy,
  GetPropertyTimeline,
  GetValuationsByAssetFilters,
  GetValuationsByAssetTotalsFilters,
  legacyGetAllProperties,
} from "../api/properties";
import { queries } from "../keys";
import { PropertyDebtMetricsSchema } from "../../schemas/property";
const { subjectErrorCRUD } = notificationMessages;

export const useLegacyGetAllProperties = ({
  onSuccess,
}: {
  propertyId: LegacyProperty["property_code"];
  onSuccess: (data: LegacyProperty[]) => void;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.legacyAllProperties,
    queryFn: () => legacyGetAllProperties(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "all properties",
        }),
        message: parseError(error),
      });
    },
    onSettled: (data) => {
      onSuccess(data);
    },
  });
};

export const useLegacyGetAllPropertiesByGavFilter = (
  filters: GenericFilterPayload
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.legacyAllPropertiesByGavFilter(filters),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "all properties by gav filter",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useLegacyGetProperty = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.legacyProperty(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "property by id",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useGetPropertyImage = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.imagesByProperty(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "property images by id",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useLegacyGetKpiByProperty = ({ id, source }: PropertyKpi) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.kpiByProperty({ id, source }),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "property kpi by id",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useLegacyGetDebtMetricsByPropertyId = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.legacyDebtMetrics(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "property debt metrics",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useLegacyGetPropertyProjectedExitMetrics = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.propertyProjectedExitMetrics(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "property projected exit metrics by id",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useGetPropertyOperationalFinancialPerformanceMetrics = (
  filters: GetPropertyOFPMetricsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.operationalFinancialPerformanceMetrics(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Operational Financial Performance",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useGetPropertyOperationalFinancialPerformanceHistorical = (
  filters: GetPropertyOFPHistoricalMetricsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.operationalFinancialPerformanceHistorical(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Operational Financial Performance (Historical)",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
  });
};

export const useARPropertyTable = (filters: GetARPropertyTableFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const redirectOn404 = useRedirectOn404({ redirectPath: getPropertiesURL() });
  return useQuery({
    ...queries.properties.arPropertyTable(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "A/R property table",
        }),
        message: parseError(error),
      });
      redirectOn404(error);
    },
    enabled: !!filters?.yardi_entity_code,
  });
};

interface UseGetOperationalStatement {
  filters: GenericFilterPayload;
  enabled?: boolean;
}

export const useGetOperationalStatement = ({
  filters,
  enabled = true,
}: UseGetOperationalStatement) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.operationalStatement(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Operational Statement",
        }),
        message: parseError(error),
      });
    },
    enabled: enabled,
  });
};

export const useAllProperties = (filters: GetAllPropertiesFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.allProperties(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "All Properties",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useProperty = (filters: GetPropertyFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.property(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPropertyDebtMetrics = ({
  filters,
  onSuccess,
}: {
  filters: GetPropertyDebtMetricsFilters;
  onSuccess?: (
    data: PaginatedResponse<typeof PropertyDebtMetricsSchema>
  ) => void;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.propertyDebtMetrics(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Debt Metrics",
        }),
        message: parseError(error),
      });
    },
    onSuccess(data) {
      onSuccess?.(data);
    },
  });
};

export const useGetPropertyTimeline = (filters: GetPropertyTimeline) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.propertyTimeline(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Timeline",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPropertyComments = ({
  filters,
}: {
  filters: GetPropertyComments;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.propertyComments(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Comments",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPropertyStrategy = ({
  filters,
}: {
  filters: GetPropertyStrategy;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.propertyStrategy(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Strategy",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPropertyAttachments = ({
  filters,
}: {
  filters: GetPropertyAttachments;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.propertyAttachments(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Property Attachments",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetPropertiesGeography = ({
  filters,
}: {
  filters: GetPropertiesGeographyFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.propertiesGeography(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Properties Geography",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetTotalDistributionByType = ({
  filters,
}: {
  filters: GetAssetTotalDistributionsByTypeFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.totalDistributionByType(
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
  });
};

export const useGetTotalDistributionByTypeTotals = ({
  filters,
}: {
  filters: GetAssetTotalDistributionsByTypeTotalsFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.totalDistributionByTypeTotals(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Total Distribution By Type (Totals)",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetValuationsByAsset = ({
  filters,
}: {
  filters: GetValuationsByAssetFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.valuationsByAsset(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Valuations By Asset",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetValuationsByAssetTotals = ({
  filters,
}: {
  filters: GetValuationsByAssetTotalsFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.valuationsByAssetTotals(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Valuations By Asset (Totals)",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetAssetLeaseExpirationPortrait = ({
  filters,
}: {
  filters: GetAssetLeaseExpirationPortraitFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.leaseExpirationPortrait(
      cleanEmptyObjectValues(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Asset Lease Expiration Portrait",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetAssetStackingPlan = ({
  filters,
}: {
  filters: GetAssetStakingPlanFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.stakingPlan(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Asset Stacking Plan",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetAssetRentRoll = ({
  filters,
}: {
  filters: GetAssetRentRollFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.properties.rentRoll(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Asset Rent Roll",
        }),
        message: parseError(error),
      });
    },
  });
};
