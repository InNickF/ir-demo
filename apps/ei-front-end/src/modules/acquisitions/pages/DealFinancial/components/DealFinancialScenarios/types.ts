import {
  Deal,
  DealFinancialScenario,
} from "@/modules/acquisitions/typings/deals";

export interface ScenarioBaseCardsProps {
  dealId: Deal["id"];
  scenarioId: DealFinancialScenario["scenario_id"];
}
