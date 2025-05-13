import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { queries } from "../keys";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";
import {
  GetAssetLocationTenantsByPropertyFilters,
  GetTenantsBreakdownFilters,
} from "../api/asset-growth";

export const useLegacyTenantBreakdowns = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.assetGrowth.legacyTenantBreakdowns(filters),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "tenant breakdowns",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useManagementOpportunities = (filters: GenericFilterPayload) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.assetGrowth.managementOpportunities(
      objectWithSomeValueOrNull(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "Asset management opportunities",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useLegacyAssetLocationTenants = (
  filters: GenericFilterPayload
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.assetGrowth.legacyAssetLocationTenants(
      objectWithSomeValueOrNull(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "Asset location tenants",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useTenantBreakdowns = (filters: GetTenantsBreakdownFilters) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.assetGrowth.tenantBreakdown(filters),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "Tenant Breakdowns",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useAssetLocationTenants = (
  filters: GetAssetLocationTenantsByPropertyFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.assetGrowth.assetLocationTenants(filters),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "POST",
          resource: "Asset location tenants",
        }),
        message: parseError(error),
      });
    },
  });
};
