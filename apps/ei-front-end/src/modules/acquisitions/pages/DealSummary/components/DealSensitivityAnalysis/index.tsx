import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { GenericTableRowCols } from "@/commons/typings/tables";
import { defaultPaginatedData } from "@/commons/utils";
import { FinancialDynamicTable } from "@/modules/acquisitions/components/data-display/FinancialDynamicTable";
import { useDealIdFromQueryParams } from "@/modules/acquisitions/hooks/useDealIdFromQueryParams";
import {
  useAllDealFinancialScenarios,
  useDealFinancialScenarioInvestmentKPIs,
} from "@/modules/acquisitions/services/queries/deals";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { Empty } from "in-ui-react";
import { FC, useEffect, useState } from "react";
import {
  DealFinancialScenariosSelect,
  DealFinancialScenariosSelectOptions,
} from "./components/DealFinancialScenariosSelect";

interface DealSensitivityAnalysisProps {
  className?: string;
}

export const DealSensitivityAnalysis: FC<DealSensitivityAnalysisProps> = ({
  className,
  ...props
}) => {
  const dealId = useDealIdFromQueryParams();

  const {
    data: financialScenarios = defaultPaginatedData,
    isLoading: isLoadingScenarios,
    isRefetching: isRefetchingScenarios,
    isFetched: isScenariosFetched,
  } = useAllDealFinancialScenarios({
    dealId: dealId,
    page_size: "-1",
  });

  const [activeScenario, setActiveScenario] = useState<number>(
    financialScenarios?.results[0]?.scenario_id
  );

  useEffect(() => {
    if (!activeScenario) {
      setActiveScenario(financialScenarios?.results[0]?.scenario_id);
    }
  }, [activeScenario, financialScenarios]);

  const {
    data: investmentKPIs = [],
    isLoading: isInvestmentKPIsLoading,
    isRefetching: isInvestmentKPIsRefetching,
  } = useDealFinancialScenarioInvestmentKPIs({
    scenarioId: activeScenario?.toString(),
    dealId,
  });

  const sensitivityAnalysisTable = investmentKPIs?.flatMap((section) =>
    section
      ?.filter((table) => table?.key === "sensitivity_analysis")
      .flatMap((table) => table?.value)
  ) as GenericTableRowCols[];

  // Remove the first element of the array that contains the table title because it's not needed in this case
  sensitivityAnalysisTable.length > 0 && sensitivityAnalysisTable.shift();

  const tableHasContentData = sensitivityAnalysisTable?.filter(
    (row) => !row?.key.includes("header")
  ).length;

  const hasScenarios =
    financialScenarios?.results?.length > 0 &&
    !isLoadingScenarios &&
    isScenariosFetched;

  return hasScenarios ? (
    <CardWithHeader
      title="Sensitivity Analysis"
      icon={<TableCellsIcon />}
      className={className}
      isLoading={isInvestmentKPIsLoading}
      isRefetching={isInvestmentKPIsRefetching}
      headerActions={
        <DealFinancialScenariosSelect
          scenarios={financialScenarios?.results}
          activeScenario={activeScenario}
          isLoading={isLoadingScenarios || isRefetchingScenarios}
          onChange={(scenario: DealFinancialScenariosSelectOptions) =>
            setActiveScenario(scenario?.value)
          }
        />
      }
      {...props}
    >
      {investmentKPIs?.length ? (
        <>
          <FinancialDynamicTable data={sensitivityAnalysisTable} />
          {!tableHasContentData && <Empty className="mx-auto" />}
        </>
      ) : (
        <Empty className="mx-auto" />
      )}
    </CardWithHeader>
  ) : null;
};
