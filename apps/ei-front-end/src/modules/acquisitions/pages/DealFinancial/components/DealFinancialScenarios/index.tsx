import { useDealIdFromQueryParams } from "@/acquisitions/hooks/useDealIdFromQueryParams";
import { useAllDealFinancialScenarios } from "@/acquisitions/services/queries/deals";
import { DealFinancialScenario } from "@/acquisitions/typings/deals";
import { defaultPaginatedData } from "@/commons/utils";
import { Empty } from "in-ui-react";
import { FC, useState } from "react";
import { FinancialScenarios } from "./components/FinancialScenarios";
import { ScenarioInvestmentDetails } from "./components/ScenarioInvestmentDetails";
import { ScenarioInvestmentKPIs } from "./components/ScenarioInvestmentKPIs";
import { ScenarioShortSummary } from "./components/ScenarioShortSummary";
import { ScenarioStrategy } from "./components/ScenarioStrategy";
import "./styles.css";

export const DealFinancialScenarios: FC = () => {
  const dealId = useDealIdFromQueryParams();
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useAllDealFinancialScenarios(
    {
      dealId: dealId,
      page_size: "-1",
    },
    {
      onSuccess(data) {
        if (!activeScenarioId) {
          setActiveScenario(data?.results[0]?.scenario_id || null);
        }
      },
    }
  );
  const [activeScenarioId, setActiveScenario] = useState<
    DealFinancialScenario["scenario_id"]
  >(data?.results[0]?.scenario_id || null);

  const hasScenarios = !isLoading && data?.results.length > 0;

  return hasScenarios || isLoading ? (
    <div className="acq-deal-financial-scenario-container ">
      <FinancialScenarios
        dealId={dealId as string}
        activeScenarioId={activeScenarioId}
        isLoading={isLoading}
        isRefetching={isRefetching}
        scenarios={data?.results}
        setActiveScenario={(scenarioId) => {
          setActiveScenario(scenarioId);
        }}
      />
      <section className="acq-deal-financial-tables-grid">
        <ScenarioStrategy
          dealId={dealId as string}
          scenarioId={activeScenarioId}
        />
        <ScenarioShortSummary
          scenarioId={activeScenarioId}
          dealId={dealId as string}
        />
        <ScenarioInvestmentKPIs
          className="acq-deal-financial-tables-grid__item-full-width"
          dealId={dealId as string}
          scenarioId={activeScenarioId}
        />
        <ScenarioInvestmentDetails
          className="acq-deal-financial-tables-grid__item-full-width"
          dealId={dealId as string}
          scenarioId={activeScenarioId}
        />
      </section>
    </div>
  ) : (
    <Empty />
  );
};
