import { QueryClient } from "@tanstack/react-query";
import { queries } from "../services/keys";
import { Deal } from "../typings/deals";

interface InvalidateDealsQueriesOptions {
  queryClient: QueryClient;
  dealId?: Deal["id"];
}

/*
 * invalidateDealsQueries
 * This functions encapsulates all the general side effect queries that need to be
 * invalidated when a deal is created, updated or deleted.
 */
export const invalidateDealsQueries = ({
  queryClient,
  dealId,
}: InvalidateDealsQueriesOptions) => {
  // Deals list
  queryClient.invalidateQueries({
    queryKey: queries.deals.all._def,
  });

  // Funds KPIs
  queryClient.invalidateQueries({
    queryKey: queries.funds.kpis._def,
  });

  // Overview data
  queryClient.invalidateQueries({
    queryKey: queries.deals.pipelineBy._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.locations._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealsBy._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.equityRequirements._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.criticalDates._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.pipelineSummaryByDealPhaseTotals._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.pipelineSummaryByDealPhase._def,
  });

  // Funds pipeline
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealsPipeline._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealsPipelineTotals._def,
  });

  // Invalidating an specific deal queries if a dealId is provided
  if (dealId) {
    invalidateDealInformation({ queryClient, dealId });
  }
};

interface InvalidateDealInformationOptions {
  queryClient: QueryClient;
  dealId: Deal["id"];
}

export const invalidateDealInformation = ({
  queryClient,
  dealId,
}: InvalidateDealInformationOptions) => {
  queryClient.invalidateQueries({
    queryKey: queries.deals.detail(dealId).queryKey,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealSummary(dealId).queryKey,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealTimeline(dealId).queryKey,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.allDealFinancialScenarios({ dealId }).queryKey,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealCAPEX({ dealId }).queryKey,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealFinancialScenario._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealFinancialScenarioInvestmentKPIs._def,
  });
  queryClient.invalidateQueries({
    queryKey: queries.deals.dealFinancialScenarioInvestmentDetails._def,
  });
};
