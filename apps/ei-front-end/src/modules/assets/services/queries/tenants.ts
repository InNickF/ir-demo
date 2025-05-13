import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { objectWithSomeValueOrNull } from "@/commons/utils/object-has-some-value";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { LegacyProperty } from "../../typings/property";
import { getAllTenants } from "../api/tenants";
import { queries } from "../keys";

const { subjectErrorCRUD } = notificationMessages;

export const useGetAllTenants = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.tenants.allTenants,
    queryFn: () => getAllTenants(),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "all tenants",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetTenantsByProperty = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.tenants.tenantsByProperty(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "tenants by property",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useLegacyGetStackingPlanTenantsByProperty = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.tenants.legacyStackingPlanTenant(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "stacking plan by property",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useLegacyGetKpiByPropertyAndTenants = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.tenants.kpiByProperty(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "kpi by property",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetLeaseExpirationGraph = ({
  id,
}: {
  id: LegacyProperty["property_code"];
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.tenants.leaseExpirationGraph(id),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "lease expiration graph by property",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetTableTenantInformation = ({
  id,
  filters,
}: {
  id: LegacyProperty["property_code"];
  filters: GenericFilterPayload;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    ...queries.tenants.tenantTableInformation(
      id,
      objectWithSomeValueOrNull(filters)
    ),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "tenant table information tenants by property",
        }),
        message: parseError(error),
      });
    },
  });
};
