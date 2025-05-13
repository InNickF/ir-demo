import { Fund } from "@/assets/typings/funds";
import { FundSchema } from "../entities/fund/schemas";
import { getTableOrderInitialState } from "@/commons/model-in/db/utils";
import { getTableVisibilityInitialState } from "@/commons/model-in/db/utils";
import { TableVisibilityState } from "@/commons/model-in/db/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { fundKeyNamesFormatter } from "./formatters/funds";
import { fundFormatter } from "../entities/fund/formatters";
import { GenericTableCellWithFormatter } from "@/commons/components/data-display/GenericTableCellWithFormatter";
import { getFundsURL } from "./redirects/funds-redirects";
import { SorterMap } from "@/commons/model-in/formatters/sorters";

export const allFundKeys = [
  "fund_name",
  ...Object.keys(FundSchema.shape).filter((key) => key !== "fund_name"),
] as Array<keyof Fund>;

export const fundTableKeysToIgnore: Array<keyof Fund> = [
  "year",
  "quarter",
  "current_irr",
  "projected_exit_irr",
];

export const fundsVisibilityAndOrderingUIHiddenKeys: Array<keyof Fund> = [
  "fund_name",
  ...fundTableKeysToIgnore,
];

export const getFundsTableInitialOrder = (): Array<keyof Fund> => {
  return getTableOrderInitialState({
    schema: FundSchema,
    initialOrder: allFundKeys,
    keysToIgnore: fundTableKeysToIgnore,
  });
};

export type FundsTableVisibilityState = TableVisibilityState<typeof FundSchema>;

export const getFundsTableInitialVisibility = (): FundsTableVisibilityState => {
  return getTableVisibilityInitialState({
    schema: FundSchema,
    initialVisibility: allFundKeys,
    keysToIgnore: fundTableKeysToIgnore,
  });
};

const fundsTableColumnsHelper = createColumnHelper<Fund>();

export const fundsTableColumns = allFundKeys
  .filter((key) => !fundTableKeysToIgnore.includes(key))
  .map((key: keyof Fund) =>
    fundsTableColumnsHelper.accessor(key, {
      header: fundKeyNamesFormatter({ key }),
      cell: (info) => (
        <GenericTableCellWithFormatter<Fund>
          formatter={fundFormatter}
          identifier={key}
          info={info}
          redirectToURL={
            key === "fund_name"
              ? getFundsURL({
                  id: info.row.original.fund_name,
                  section: "details",
                }).URL
              : null
          }
        />
      ),
    })
  );

export const PortfolioFundsSorter: SorterMap<Fund> = {
  cashflow_liquidation_contribution: "number",
  cashflow_liquidation_distribution: "number",
  current_irr: "number",
  current_profit: "number",
  cashflow_projected_contribution: "number",
  cashflow_projected_distribution: "number",
  projected_exit_gross_moc: "number",
  projected_exit_irr: "number",
  projected_exit_profit: "number",
  current_gross_moc: "number",
  capital_invested: "number",
  current_cash_on_cash_over_last_12_months: "number",
  current_nav: "number",
  projected_exit_nav: "number",
  current_gav: "number",
  projected_exit_gav: "number",
  occupancy_rate: "number",
  current_walt: "number",
  noi_over_last_12_months_noidm: "number",
  noi_leased_noidm: "number",
  quarter: "string",
  year: "string",
  fund_name: "string",
  yield_on_cost_over_last_12_months_noidm: "number",
  yield_on_cost_leased_noidm: "number",
  projected_exit_invested_capital: "number",
  dscr_leased_noidm: "number",
  debt_yield_leased_noidm: "number",
};

export const fundGavGroupByOptions = ["region", "status", "assets"] as const;
