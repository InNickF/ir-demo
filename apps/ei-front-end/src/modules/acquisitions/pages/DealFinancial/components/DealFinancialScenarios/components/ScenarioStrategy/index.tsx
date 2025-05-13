import { HTMLRenderer } from "@/commons/components/data-display/HTMLRenderer";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { useDealFinancialScenario } from "@/modules/acquisitions/services/queries/deals";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { ScenarioBaseCardsProps } from "../../types";

type ScenarioStrategyProps = ScenarioBaseCardsProps;
export const ScenarioStrategy: FC<ScenarioStrategyProps> = ({
  scenarioId,
  dealId,
}) => {
  const { data, isLoading, isRefetching } = useDealFinancialScenario({
    scenarioId: scenarioId?.toString(),
    dealId,
  });
  return (
    <CardWithHeader
      title="Strategy"
      icon={<LightBulbIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      skeletonHeight={500}
    >
      <HTMLRenderer html={genericGetValue(data?.strategy)} />
    </CardWithHeader>
  );
};
