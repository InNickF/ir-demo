import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { useDealFinancialScenarioInvestmentDetails } from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC } from "react";
import { FinancialDynamicTable } from "../../../../../../components/data-display/FinancialDynamicTable";
import { ScenarioBaseCardsProps } from "../../types";

interface ScenarioInvestmentDetailsProps extends ScenarioBaseCardsProps {
  className?: string;
}
export const ScenarioInvestmentDetails: FC<ScenarioInvestmentDetailsProps> = ({
  scenarioId,
  dealId,
  className,
}) => {
  const {
    data = [],
    isLoading,
    isRefetching,
  } = useDealFinancialScenarioInvestmentDetails({
    scenarioId: scenarioId?.toString(),
    dealId,
  });
  return (
    <CardWithHeader
      className={className}
      title="Investment Details"
      icon={<TableCellsIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      bodyPadding={false}
    >
      {data?.length ? (
        <FinancialDynamicTable data={data} />
      ) : (
        <Empty className="mx-auto" />
      )}
    </CardWithHeader>
  );
};
