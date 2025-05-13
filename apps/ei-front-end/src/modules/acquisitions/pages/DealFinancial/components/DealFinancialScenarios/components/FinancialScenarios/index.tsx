import { Deal, DealFinancialScenario } from "@/acquisitions/typings/deals";
import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { Loader, Skeleton } from "in-ui-react";
import { FC, useState } from "react";
import { ScenarioCard } from "../ScenarioCard";
import { EditFinancialScenarioModal } from "./EditFinancialScenarioModal";
import "./styles.css";

interface DealFinancialScenariosProps extends IsLoadingProp, IsRefetchingProp {
  scenarios?: DealFinancialScenario[];
  activeScenarioId?: DealFinancialScenario["scenario_id"];
  setActiveScenario?: (id: DealFinancialScenario["scenario_id"]) => void;
  dealId: Deal["id"];
}
export const FinancialScenarios: FC<DealFinancialScenariosProps> = ({
  activeScenarioId,
  scenarios,
  setActiveScenario,
  isLoading,
  isRefetching,
  dealId,
}) => {
  const [editingScenario, setEditingScenario] =
    useState<DealFinancialScenario>(null);

  return (
    <>
      <EditFinancialScenarioModal
        onAction={() => {
          setEditingScenario(null);
        }}
        onCancel={() => {
          setEditingScenario(null);
        }}
        scenario={editingScenario}
        dealId={dealId}
      />
      {isLoading ? (
        <Skeleton className="acq-deal-scenario-grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton.Avatar
              key={index}
              className="w-64 h-32"
              shape="squared"
            />
          ))}
        </Skeleton>
      ) : (
        <section className="acq-deal-scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario?.scenario_id}
              isActive={activeScenarioId === scenario?.scenario_id}
              onClick={() => {
                setActiveScenario(scenario?.scenario_id);
              }}
              onEdit={() => {
                setEditingScenario(scenario);
              }}
              scenario={scenario}
            />
          ))}
          <Loader className={isRefetching ? undefined : "hidden"} />
        </section>
      )}
    </>
  );
};
