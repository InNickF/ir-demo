import {
  DealFinancialScenarioInvestmentKPIs,
  DealFinancialScenarioInvestmentKPIsInner,
} from "@/modules/acquisitions/typings/deals";
import {
  fullWidthInvestmentKPIsTableKeys,
  leftInvestmentKPIsTableKeys,
  leftKeyIndexMap,
  rightInvestmentKPIsTableKeys,
  rightKeyIndexMap,
} from "../utils";

type GroupedTables = {
  leftTables: DealFinancialScenarioInvestmentKPIsInner[];
  rightTables: DealFinancialScenarioInvestmentKPIsInner[];
  fullTables: DealFinancialScenarioInvestmentKPIsInner[];
};

export const useGroupKPIsTables = (
  tables: DealFinancialScenarioInvestmentKPIs[]
): GroupedTables => {
  const groupedTables = tables?.reduce(
    (acc, outerArray) => {
      outerArray.forEach((table) => {
        if (table && leftInvestmentKPIsTableKeys.includes(table.key)) {
          acc.leftTables.push(table);
        }

        if (table && rightInvestmentKPIsTableKeys.includes(table.key)) {
          acc.rightTables.push(table);
        }

        if (table && fullWidthInvestmentKPIsTableKeys.includes(table.key)) {
          acc.fullTables.push(table);
        }
      });
      return acc;
    },
    { leftTables: [], rightTables: [], fullTables: [] } as GroupedTables
  );

  const { leftTables, rightTables, fullTables } = groupedTables;

  leftTables.sort(
    (a, b) => leftKeyIndexMap.get(a.key) - leftKeyIndexMap.get(b.key)
  );

  rightTables.sort(
    (a, b) => rightKeyIndexMap.get(a.key) - rightKeyIndexMap.get(b.key)
  );

  return { leftTables, rightTables, fullTables } as GroupedTables;
};
