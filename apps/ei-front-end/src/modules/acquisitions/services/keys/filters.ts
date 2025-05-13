import { createQueryKeys } from "@lukemorales/query-key-factory";

export const filtersQueries = createQueryKeys("filters", {
  fundsOverview: null,
  dealsSummary: null,
  dealsBy: null,
  pipelineBy: null,
  dealRoom: null,
  compFilters: null,
  dealRoomLabels: null,
  editDealChoices: null,
  compstackCompChoices: null,
});
