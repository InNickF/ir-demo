import { Property } from "@/modules/assets/typings/properties";
import { PropertyKpiFilters } from "./usePropertyKpiFilter";

interface UsePropertyMetricsKeysParams {
  filter: PropertyKpiFilters;
}
interface UsePropertyMetricsKeys {
  keys: Array<keyof Property>;
  withPSFKeys: Array<keyof Property>;
}
export const usePropertyMetricsKeys = ({
  filter,
}: UsePropertyMetricsKeysParams): UsePropertyMetricsKeys => {
  const keys: Record<PropertyKpiFilters, UsePropertyMetricsKeys> = {
    LIQ: {
      keys: [
        "noi_over_last_12_months_noidm",
        "noi_leased_noidm",
        "occupancy_rate",
        "current_walt",
        "current_gross_irr",
        "current_gross_moc",
        "current_profit",
        "capital_invested",
        "current_nav",
        "current_total_basis",
        "current_gav",
        "current_cash_on_cash_over_last_12_months",
        "yield_on_cost_over_last_12_months_noidm",
        "yield_on_cost_leased_noidm",
      ],
      withPSFKeys: [
        "noi_over_last_12_months_noidm",
        "noi_leased_noidm",
        "current_profit",
        "capital_invested",
        "current_nav",
        "current_total_basis",
        "current_gav",
      ],
    },
    PROJ: {
      keys: [
        "projected_exit_noi",
        "projected_exit_profit",
        "projected_exit_invested_capital",
        "projected_exit_total_basis",
        "projected_sale_price",
        "projected_net_proceeds_after_sale",
        "projected_exit_occupancy_rate",
        "projected_exit_gross_irr",
        "projected_exit_gross_moc",
        "projected_exit_cap_rate",
        "projected_exit_imputed_cap_rate",
        "projected_buyers_3rd_year_yoc",
      ],
      withPSFKeys: [
        "projected_exit_noi",
        "projected_exit_profit",
        "projected_exit_invested_capital",
        "projected_exit_total_basis",
        "projected_sale_price",
        "projected_net_proceeds_after_sale",
      ],
    },
  };

  return keys[filter];
};
