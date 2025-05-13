import { Deal } from "@/acquisitions/typings/deals";
import { GenericFilterPayload } from "@/commons/typings";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  GetAllDealCompstackCompsFilters,
  GetAllDealFinancialScenariosParams,
  GetDealCAPEXParams,
  GetDealCompstackCompsParams,
  GetDealFinancialScenarioInvestmentDetails,
  GetDealFinancialScenarioInvestmentKPIs,
  GetDealFinancialScenarioParams,
  GetDealUtilityScoreArgs,
  getAllDealCompstackComps,
  getAllDealFinancialScenarios,
  getCriticalDates,
  getDeal,
  getDealCAPEX,
  getDealCompTotals,
  getDealComps,
  getDealCompstackLandComps,
  getDealCompstackLeaseComps,
  getDealCompstackSaleComps,
  getDealFinancialScenario,
  getDealFinancialScenarioInvestmentDetails,
  getDealFinancialScenarioInvestmentKPIs,
  getDealFinancialScenarioSummary,
  getDealPhotos,
  getDealRisksAndMitigantsParams,
  getDealRisksAndMitigants,
  getDealRoomItems,
  getDealStrategyTags,
  getDealSummary,
  getDealTenantInformation,
  getDealTenantInformationParams,
  getDealTimeline,
  getDealUtilityScore,
  getDeals,
  getDealsBy,
  getDealsLocations,
  getDealsPipeline,
  getDealsPipelineTotals,
  getEquityRequirements,
  getPipelineBy,
  getPipelineSummaryByDealPhase,
  getPipelineSummaryByDealPhaseTotals,
} from "../api/deals";

export const dealsQueries = createQueryKeys("deals", {
  all: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDeals(filters),
  }),
  locations: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDealsLocations(filters),
  }),
  detail: (dealId: Deal["id"]) => ({
    queryKey: [dealId],
    queryFn: () => getDeal(dealId),
  }),
  pipelineSummaryByDealPhaseTotals: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getPipelineSummaryByDealPhaseTotals(filters),
  }),
  pipelineSummaryByDealPhase: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getPipelineSummaryByDealPhase(filters),
  }),
  dealsBy: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDealsBy(filters),
  }),
  pipelineBy: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getPipelineBy(filters),
  }),
  criticalDates: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getCriticalDates(filters),
  }),
  equityRequirements: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getEquityRequirements(filters),
  }),
  dealsPipeline: (filters: GenericFilterPayload & { phase: string }) => ({
    queryKey: [filters],
    queryFn: (context) => {
      return getDealsPipeline(context?.pageParam || filters);
    },
  }),
  dealsPipelineTotals: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDealsPipelineTotals(filters),
  }),
  dealRoomItems: (filters: GenericFilterPayload) => ({
    queryKey: [filters],
    queryFn: () => getDealRoomItems(filters),
  }),
  dealStrategyTags: () => ({
    queryKey: ["dealStrategyTags"],
    queryFn: () => getDealStrategyTags(),
  }),
  dealComps: ({
    filters,
    dealId,
  }: {
    filters?: GenericFilterPayload;
    dealId: Deal["id"];
  }) => ({
    queryKey: [{ dealId, ...filters }],
    queryFn: () => getDealComps(filters, dealId),
  }),
  dealCompsByType: ({
    filters,
    dealId,
  }: {
    filters?: GenericFilterPayload;
    dealId: Deal["id"];
  }) => ({
    queryKey: [{ dealId, ...filters }],
  }),
  dealCompTotals: (filters: GenericFilterPayload, dealId: Deal["id"]) => ({
    queryKey: [{ dealId, ...filters }],
    queryFn: () => getDealCompTotals(filters, dealId),
  }),
  dealCompTotalsByType: (
    filters: GenericFilterPayload,
    dealId: Deal["id"]
  ) => ({
    queryKey: [{ dealId, ...filters }],
  }),
  dealSummary: (dealId: Deal["id"]) => ({
    queryKey: [dealId],
    queryFn: () => getDealSummary(dealId),
  }),
  dealPhotos: (dealId: Deal["id"]) => ({
    queryKey: [dealId],
    queryFn: () => getDealPhotos(dealId),
  }),
  dealTimeline: (dealId: Deal["id"]) => ({
    queryKey: [dealId],
    queryFn: () => getDealTimeline(dealId),
  }),
  dealCompstackLeaseComps: (args: GetDealCompstackCompsParams) => ({
    queryKey: [{ ...args?.filters, dealId: args?.dealId }],
    queryFn: () => getDealCompstackLeaseComps(args),
  }),
  dealCompstackSaleComps: (args: GetDealCompstackCompsParams) => ({
    queryKey: [{ ...args?.filters, dealId: args?.dealId }],
    queryFn: () => getDealCompstackSaleComps(args),
  }),
  dealCompstackLandComps: (args: GetDealCompstackCompsParams) => ({
    queryKey: [{ ...args?.filters, dealId: args?.dealId }],
    queryFn: () => getDealCompstackLandComps(args),
  }),
  allDealCompstackComps: (args: GetAllDealCompstackCompsFilters) => ({
    queryKey: [{ ...args?.filters, dealId: args?.dealId, type: args?.type }],
    queryFn: () => getAllDealCompstackComps(args),
  }),
  allDealFinancialScenarios: (args: GetAllDealFinancialScenariosParams) => ({
    queryKey: [{ ...args }],
    queryFn: () => getAllDealFinancialScenarios(args),
  }),
  dealFinancialScenario: (args: GetDealFinancialScenarioParams) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealFinancialScenario(args),
  }),
  dealFinancialScenarioInvestmentKPIs: (
    args: GetDealFinancialScenarioInvestmentKPIs
  ) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealFinancialScenarioInvestmentKPIs(args),
  }),
  dealFinancialScenarioInvestmentDetails: (
    args: GetDealFinancialScenarioInvestmentDetails
  ) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealFinancialScenarioInvestmentDetails(args),
  }),
  dealCAPEX: (args: GetDealCAPEXParams) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealCAPEX(args),
  }),
  dealFinancialScenarioSummary: (dealId: Deal["id"], scenarioId: string) => ({
    queryKey: [{ dealId, scenarioId }],
    queryFn: () => getDealFinancialScenarioSummary(dealId, scenarioId),
  }),
  dealUtilityScore: (args: GetDealUtilityScoreArgs) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealUtilityScore(args),
  }),
  dealTenantInformation: (args: getDealTenantInformationParams) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealTenantInformation(args),
  }),
  dealRisksAndMitigants: (args: getDealRisksAndMitigantsParams) => ({
    queryKey: [{ ...args }],
    queryFn: () => getDealRisksAndMitigants(args),
  }),
});
