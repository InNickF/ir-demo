import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { cleanEmptyObjectValues } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { subjectErrorCRUD } from "@/commons/utils/notification-messages";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import {
  GetFundCommentsFilters,
  GetFundFilters,
  GetFundGavByFilters,
  GetFundLeaseExpirationFilters,
  GetFundsFilters,
  GetFundStrategyFilters,
  GetFundTimelineFilters,
} from "../api/funds";
import { queries } from "../keys";

export const useGetFunds = ({ filters }: { filters: GetFundsFilters }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.all(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Funds",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFund = ({ filters }: { filters: GetFundFilters }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.fund(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Fund",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useFundGavBy = ({ filters }: { filters: GetFundGavByFilters }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.gavBy(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `Fund Gav By: ${filters?.group_by}`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFundLeaseExpiration = ({
  filters,
}: {
  filters: GetFundLeaseExpirationFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.leaseExpiration(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `Fund Lease Expiration`,
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFundComments = ({
  filters,
}: {
  filters: GetFundCommentsFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.fundComments(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Fund Comments",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFundStrategy = ({
  filters,
}: {
  filters: GetFundStrategyFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.fundStrategy(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Fund Strategy",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFundTimeline = ({
  filters,
}: {
  filters: GetFundTimelineFilters;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.fundTimeline(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Fund Timeline",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFundIRR = ({ filters }: { filters: GetFundFilters }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.fundIRR(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Fund IRR",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useGetFundExitIRR = ({ filters }: { filters: GetFundFilters }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    ...queries.funds.fundExitIRR(cleanEmptyObjectValues(filters)),
    keepPreviousData: true,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Fund Exit IRR",
        }),
        message: parseError(error),
      });
    },
  });
};
