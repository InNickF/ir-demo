import {
  Deal,
  DealPhase,
  DealPipelineSummary,
} from "@/acquisitions/typings/deals";
import { Comp, CompTotals } from "@/acquisitions/typings/market-analytics";

import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import {
  GenericFilterPayload,
  IPaginatedResponse,
  PaginatedResponse,
} from "@/commons/typings";
import { cleanEmptyObjectValues, notificationMessages } from "@/commons/utils";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { DealFinancialScenarioSchema } from "../../schemas/deals";
import {
  GetAllDealCompstackCompsFilters,
  GetAllDealFinancialScenariosParams,
  GetDealCAPEXParams,
  GetDealCompstackCompsParams,
  GetDealFinancialScenarioInvestmentDetails,
  GetDealFinancialScenarioInvestmentKPIs,
  GetDealFinancialScenarioParams,
  GetDealUtilityScoreArgs,
  getDealCompTotalsByType,
  getDealCompsByType,
  getDealRisksAndMitigantsParams,
  getDealTenantInformationParams,
} from "../api/deals";
import { queries } from "../keys";

const { subjectErrorCRUD } = notificationMessages;

export const useDeals = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery<IPaginatedResponse<Deal>>({
    keepPreviousData: true,
    ...queries.deals.all(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "deals" }),
        message: parseError(error),
      });
    },
  });
};

export const useDeal = ({
  dealId,
  onError,
  onSuccess,
}: {
  dealId: string;
  onError?: (error: AxiosError) => void;
  onSuccess?: (data: Deal) => void;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery<Deal, AxiosError>({
    ...queries.deals.detail(dealId),
    keepPreviousData: true,
    enabled: !!dealId,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "deal" }),
        message: parseError(error),
      });
      onError?.(error);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};

export const useDealsLocations = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.locations(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "deal locations" }),
        message: parseError(error),
      });
    },
  });
};

export const usePipelineSummaryByDealPhaseTotals = (
  filters: GenericFilterPayload = {}
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.pipelineSummaryByDealPhaseTotals(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal phase totals",
        }),
        message: parseError(error),
      });
    },
  });
};

export const usePipelineSummaryByDealPhase = (
  filters: GenericFilterPayload = {}
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.pipelineSummaryByDealPhase(
      cleanEmptyObjectValues(filters)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "pipeline summary by deal phase",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealsBy = ({
  filters = {},
  enabled = false,
}: {
  filters: GenericFilterPayload;
  enabled: boolean;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealsBy(cleanEmptyObjectValues(filters)),
    enabled,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deals by",
        }),
        message: parseError(error),
      });
    },
  });
};

export const usePipelineBy = ({
  filters = {},
  enabled = false,
}: {
  filters: GenericFilterPayload;
  enabled: boolean;
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.pipelineBy(cleanEmptyObjectValues(filters)),
    enabled,
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "pipeline by",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useCriticalDates = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.criticalDates(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "critical dates",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useEquityRequirements = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.equityRequirements(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "equity requirements",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealsPipeline = (
  filters: GenericFilterPayload & { phase: DealPhase }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useInfiniteQuery({
    keepPreviousData: true,
    getNextPageParam: (lastPage: IPaginatedResponse<DealPipelineSummary>) => {
      const nextPage = lastPage.next;
      const pageFromLink = nextPage
        ? nextPage.split("page=")[1].split("&")[0]
        : undefined;
      return pageFromLink ? { ...filters, page: pageFromLink } : undefined;
    },
    ...queries.deals.dealsPipeline(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "pipeline",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealsPipelineTotals = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealsPipelineTotals(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "pipeline totals",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealRoom = (filters: GenericFilterPayload = {}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealRoomItems(cleanEmptyObjectValues(filters)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal room files",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealStrategyTags = () => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    staleTime: Infinity,
    keepPreviousData: true,
    ...queries.deals.dealStrategyTags(),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal strategy tags",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealComps = (
  filters: GenericFilterPayload = {},
  dealId: Deal["id"] = null
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const dealQueryId = router.query?.dealId;
  const finalDealId = dealId || (dealQueryId as string);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealComps({
      filters: cleanEmptyObjectValues(filters),
      dealId: finalDealId,
    }),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal comps",
        }),
        message: parseError(error),
      });
    },
    enabled: !!finalDealId,
  });
};

export const useDealCompsByType = <T extends Comp>(
  filters: GenericFilterPayload & { type: T["type"] },
  dealId: Deal["id"] | null = null
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const dealQueryId = router.query?.dealId;
  const finalDealId = dealId || (dealQueryId as string);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCompsByType({
      filters: cleanEmptyObjectValues(filters),
      dealId: finalDealId,
    }),
    queryFn: () =>
      getDealCompsByType<T>(cleanEmptyObjectValues(filters), finalDealId),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `deal comps by type: ${filters.type}`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!finalDealId,
  });
};

export const useDealCompTotals = (
  filters: GenericFilterPayload = {},
  dealId: Deal["id"] = null
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const dealQueryId = router.query?.dealId;
  const finalDealId = dealId || (dealQueryId as string);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCompTotals(
      cleanEmptyObjectValues(filters),
      finalDealId
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal comp totals",
        }),
        message: parseError(error),
      });
    },
    enabled: !!finalDealId,
  });
};

export const useDealCompTotalsByType = <T extends CompTotals>(
  filters: GenericFilterPayload & { type: Comp["type"] },
  dealId: Deal["id"] = null
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const dealQueryId = router.query?.dealId;
  const finalDealId = dealId || (dealQueryId as string);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCompTotalsByType(
      cleanEmptyObjectValues(filters),
      finalDealId
    ),
    queryFn: () =>
      getDealCompTotalsByType<T>(cleanEmptyObjectValues(filters), finalDealId),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: `deal comp totals by type: ${filters.type}`,
        }),
        message: parseError(error),
      });
    },
    enabled: !!finalDealId,
  });
};

export const useDealSummary = (dealId: Deal["id"]) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealSummary(dealId),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "deal summary" }),
        message: parseError(error),
      });
    },
    enabled: !!dealId,
  });
};

export const useDealPhotos = (dealId: Deal["id"]) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealPhotos(dealId),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal photos",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealTimeline = (dealId: Deal["id"]) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealTimeline(dealId),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({ verb: "GET", resource: "deal timeline" }),
        message: parseError(error),
      });
    },
  });
};

export const useDealCompstackLeaseComps = (
  args: GetDealCompstackCompsParams
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCompstackLeaseComps(args),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal compstack comps",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId,
  });
};

export const useDealCompstackSaleComps = (
  args: GetDealCompstackCompsParams
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCompstackSaleComps(args),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal compstack comps",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId,
  });
};

export const useDealCompstackLandComps = (
  args: GetDealCompstackCompsParams
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCompstackLandComps(args),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal compstack comps",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId,
  });
};

export const useAllDealCompstackComps = (
  args: GetAllDealCompstackCompsFilters
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.allDealCompstackComps(args),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "deal compstack comps",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId,
  });
};

export const useAllDealFinancialScenarios = (
  args: GetAllDealFinancialScenariosParams,
  options?: {
    onSuccess?: (
      data: PaginatedResponse<typeof DealFinancialScenarioSchema>
    ) => void;
  }
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.deals.allDealFinancialScenarios(cleanEmptyObjectValues(args)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal Financial Scenarios",
        }),
        message: parseError(error),
      });
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    enabled: !!args.dealId,
  });
};

export const useDealFinancialScenario = (
  args: GetDealFinancialScenarioParams
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealFinancialScenario(cleanEmptyObjectValues(args)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal Financial Scenario",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId && !!args.scenarioId,
  });
};

export const useDealFinancialScenarioInvestmentKPIs = (
  args: GetDealFinancialScenarioInvestmentKPIs
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealFinancialScenarioInvestmentKPIs(
      cleanEmptyObjectValues(args)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal Financial Scenario (Investment Cash Flow Yearly)",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId && !!args.scenarioId,
  });
};

export const useDealFinancialScenarioInvestmentDetails = (
  args: GetDealFinancialScenarioInvestmentDetails
) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealFinancialScenarioInvestmentDetails(
      cleanEmptyObjectValues(args)
    ),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal Financial Scenario (Investment Details)",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId && !!args.scenarioId,
  });
};

export const useDealCAPEX = (args: GetDealCAPEXParams) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealCAPEX(cleanEmptyObjectValues(args)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal CAPEX",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args.dealId,
  });
};

export const useDealFinancialScenarioSummary = (
  dealId: Deal["id"],
  scenarioId: string
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealFinancialScenarioSummary(dealId, scenarioId),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Scenario summary",
        }),
        message: parseError(error),
      });
    },
    enabled: !!dealId,
  });
};

export const useDealUtilityScore = (args: GetDealUtilityScoreArgs) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealUtilityScore(cleanEmptyObjectValues(args)),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Utility Score",
        }),
        message: parseError(error),
      });
    },
    enabled: !!args?.dealId,
  });
};

export const useDealTenantInformation = (
  args: getDealTenantInformationParams
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealTenantInformation(args),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal Tenant Information",
        }),
        message: parseError(error),
      });
    },
  });
};

export const useDealRisksAndMitigants = (
  args: getDealRisksAndMitigantsParams
) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  return useQuery({
    keepPreviousData: true,
    ...queries.deals.dealRisksAndMitigants(args),
    onError: (error) => {
      createNotification({
        kind: "error",
        subject: subjectErrorCRUD({
          verb: "GET",
          resource: "Deal Risks And Mitigants",
        }),
        message: parseError(error),
      });
    },
  });
};
