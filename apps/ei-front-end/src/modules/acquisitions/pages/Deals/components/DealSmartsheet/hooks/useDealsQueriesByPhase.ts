import { DealSchema } from "@/acquisitions/schemas/deals";
import { useDeals } from "@/acquisitions/services/queries/deals";
import { Deal, DealPhase } from "@/acquisitions/typings/deals";
import { GenericFilterPayload, PaginatedResponse } from "@/commons/typings";
import { useCallback, useMemo } from "react";
import {
  dealSmartsheetTableSection,
  dealSmartsheetTableCommonFilters,
} from "../utils";
import { sortItems } from "@/commons/model-in/formatters/sorters";
import { dealSorters } from "@/modules/acquisitions/utils/deals";

interface UseDealQueriesByPhaseArgs {
  filters?: GenericFilterPayload;
  ordering?: string & keyof Deal;
}

interface DealSmartsheetSectionData {
  id: DealPhase;
  label: string;
  data: Deal[];
  isRefetching: boolean;
}

export const useDealsQueriesByPhase = (args: UseDealQueriesByPhaseArgs) => {
  const commonFilters = useMemo(
    () => ({ ...args?.filters, ...dealSmartsheetTableCommonFilters }),
    [args?.filters]
  );

  const screeningQuery = useDeals({
    ...commonFilters,
    phase: "SCREENING",
  });

  const loiQuery = useDeals({
    ...commonFilters,
    phase: "LOI",
  });

  const psaQuery = useDeals({
    ...commonFilters,
    phase: "PSA",
  });

  const ddQuery = useDeals({
    ...commonFilters,
    phase: "DD",
  });

  const closedQuery = useDeals({
    ...commonFilters,
    phase: "CLOSED",
  });

  const deadQuery = useDeals({
    ...commonFilters,
    phase: "DEAD",
  });

  const isLoading = useMemo(() => {
    return (
      screeningQuery.isLoading ||
      loiQuery.isLoading ||
      psaQuery.isLoading ||
      ddQuery.isLoading ||
      closedQuery.isLoading ||
      deadQuery.isLoading
    );
  }, [
    screeningQuery.isLoading,
    loiQuery.isLoading,
    psaQuery.isLoading,
    ddQuery.isLoading,
    closedQuery.isLoading,
    deadQuery.isLoading,
  ]);

  const getQueryPaginatedData = useCallback(
    (data: PaginatedResponse<typeof DealSchema>): Deal[] => {
      const deals = data?.results || ([] as Deal[]);

      return sortItems({
        items: deals,
        sortBy: args?.ordering || "sorting",
        sorter: dealSorters,
      });
    },
    [args.ordering]
  );

  const flattedIds: Deal["id"][] = useMemo(() => {
    const queries = [
      getQueryPaginatedData(screeningQuery?.data) || [],
      getQueryPaginatedData(loiQuery?.data) || [],
      getQueryPaginatedData(psaQuery?.data) || [],
      getQueryPaginatedData(ddQuery?.data) || [],
      getQueryPaginatedData(closedQuery?.data) || [],
      getQueryPaginatedData(deadQuery?.data) || [],
    ];
    const ids = queries.reduce((acc, data, index) => {
      const currentIds = data.map((deal) => deal.id);

      return [...acc, dealSmartsheetTableSection[index], ...currentIds];
    }, [] as string[]);
    return ids;
  }, [
    screeningQuery?.data,
    loiQuery?.data,
    psaQuery?.data,
    ddQuery?.data,
    closedQuery?.data,
    deadQuery?.data,
    getQueryPaginatedData,
  ]);

  const phasesSectionData: DealSmartsheetSectionData[] = useMemo(() => {
    const sections: DealSmartsheetSectionData[] = [
      {
        id: "SCREENING",
        label: "Screening",
        data: getQueryPaginatedData(screeningQuery?.data),
        isRefetching: screeningQuery?.isRefetching,
      },
      {
        id: "LOI",
        label: "LOI",
        data: getQueryPaginatedData(loiQuery?.data),
        isRefetching: loiQuery?.isRefetching,
      },
      {
        id: "PSA",
        label: "PSA",
        data: getQueryPaginatedData(psaQuery?.data),
        isRefetching: psaQuery?.isRefetching,
      },
      {
        id: "DD",
        label: "DD/Legal",
        data: getQueryPaginatedData(ddQuery?.data),
        isRefetching: ddQuery?.isRefetching,
      },
      {
        id: "CLOSED",
        label: "Closed",
        data: getQueryPaginatedData(closedQuery?.data),
        isRefetching: closedQuery?.isRefetching,
      },
      {
        id: "DEAD",
        label: "Dead",
        data: getQueryPaginatedData(deadQuery?.data),
        isRefetching: deadQuery?.isRefetching,
      },
    ];

    return sections;
  }, [
    loiQuery?.data,
    loiQuery?.isRefetching,
    psaQuery?.data,
    psaQuery?.isRefetching,
    ddQuery?.data,
    ddQuery?.isRefetching,
    screeningQuery?.data,
    screeningQuery?.isRefetching,
    closedQuery?.data,
    closedQuery?.isRefetching,
    deadQuery?.data,
    deadQuery?.isRefetching,
    getQueryPaginatedData,
  ]);

  return {
    loiQuery,
    psaQuery,
    ddQuery,
    screeningQuery,
    closedQuery,
    deadQuery,
    flattedIds,
    isLoading,
    phasesSectionData,
  };
};
