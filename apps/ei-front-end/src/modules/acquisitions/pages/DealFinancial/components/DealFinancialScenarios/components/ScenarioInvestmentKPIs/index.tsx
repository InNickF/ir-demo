import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericTableRowCols } from "@/commons/typings/tables";
import { useDealFinancialScenarioInvestmentKPIs } from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC } from "react";
import { FinancialDynamicTable } from "../../../../../../components/data-display/FinancialDynamicTable";
import { ScenarioBaseCardsProps } from "../../types";
import { useGroupKPIsTables } from "./hooks/useGroupKPIsTables";
import "./styles.css";

interface ScenarioInvestmentKPIsProps extends ScenarioBaseCardsProps {
  className?: string;
}
export const ScenarioInvestmentKPIs: FC<ScenarioInvestmentKPIsProps> = ({
  scenarioId,
  dealId,
  className,
}) => {
  const {
    data = [],
    isLoading,
    isRefetching,
  } = useDealFinancialScenarioInvestmentKPIs({
    scenarioId: scenarioId?.toString(),
    dealId,
  });

  const prefix = "scenario-investment-kpis";

  const { leftTables, rightTables, fullTables } = useGroupKPIsTables(data);

  return (
    <CardWithHeader
      className={className}
      title="Investment KPIs"
      icon={<TableCellsIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      {data.length ? (
        <>
          <div className={`${prefix}__grid`}>
            <div className={`${prefix}__grid-column`}>
              {leftTables.map(({ key, value }) => (
                <FinancialDynamicTable
                  key={key}
                  className={`${prefix}__bordered-table`}
                  data={value as GenericTableRowCols[]}
                />
              ))}
            </div>
            <div className={`${prefix}__grid-column`}>
              {rightTables.map(({ key, value }) => (
                <FinancialDynamicTable
                  key={key}
                  className={`${prefix}__bordered-table`}
                  data={value as GenericTableRowCols[]}
                />
              ))}
            </div>
            {fullTables.map(({ key, value }) => (
              <div key={key} className={`${prefix}__full-width-table`}>
                <FinancialDynamicTable
                  className={`${prefix}__bordered-table`}
                  data={value as GenericTableRowCols[]}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Empty className="mx-auto" />
      )}
    </CardWithHeader>
  );
};
