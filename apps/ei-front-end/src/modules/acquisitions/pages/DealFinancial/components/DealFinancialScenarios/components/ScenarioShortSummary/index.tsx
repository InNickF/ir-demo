import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { TableCard } from "@/commons/components/general/TableCard";
import { DealMetricsTable } from "@/modules/acquisitions/components/data-display/DealMetricsTable";
import { useDealFinancialScenarioSummary } from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC } from "react";
import { ScenarioBaseCardsProps } from "../../types";

type ScenarioShortSummaryProps = ScenarioBaseCardsProps;
export const ScenarioShortSummary: FC<ScenarioShortSummaryProps> = ({
  dealId,
  scenarioId,
}) => {
  const { data, isLoading, isRefetching } = useDealFinancialScenarioSummary(
    dealId,
    scenarioId?.toString()
  );

  return (
    <CardWithHeader
      title="Short Summary"
      icon={<TableCellsIcon />}
      isLoading={isLoading}
      skeletonHeight={500}
      isRefetching={isRefetching}
    >
      {data?.deal_metrics.length ? (
        <TableCard.Body>
          <DealMetricsTable metrics={data?.deal_metrics} />
        </TableCard.Body>
      ) : (
        <Empty className="mx-auto" />
      )}
    </CardWithHeader>
  );
};
