import {
  ARPropertyTable,
  ARTenantDrillDownTotals,
  ARTenantRow,
} from "@/modules/assets/typings/portfolio";

interface GetARTenantDrillDownAndTotalsArgs {
  drillDown: ARTenantRow["drill_down"];
  totals: ARTenantDrillDownTotals;
}
export const getARTenantDrillDownAndTotals = ({
  drillDown,
  totals,
}: GetARTenantDrillDownAndTotalsArgs) => {
  if (!totals) {
    return drillDown || [];
  }
  if (!drillDown) {
    return [];
  }

  return [...drillDown, { charge_type: "Totals", ...totals }];
};

interface GetARPropertyTableAndTotalsArgs {
  data: ARPropertyTable;
}
export const getARPropertyTableAndTotals = ({
  data,
}: GetARPropertyTableAndTotalsArgs): ARPropertyTable["drill_down"] => {
  if (!data) return [];

  if (!data?.totals) {
    return data?.drill_down || [];
  }
  if (!data?.drill_down) {
    return [];
  }

  return [...data.drill_down, { name: "Totals", ...data.totals }];
};
