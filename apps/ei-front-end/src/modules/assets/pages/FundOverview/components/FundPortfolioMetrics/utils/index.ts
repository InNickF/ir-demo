import { Fund } from "@/modules/assets/typings/funds";

export const filteredFundPortfolioMetrics = ({
  metrics,
  filter,
}: {
  metrics: Fund;
  filter: "PROJ" | "LIQ";
}): Array<[string, string | number]> => {
  if (!metrics) {
    return [];
  }

  const excludedKeys = ["quarter", "year", "fund_name"] as Array<keyof Fund>;

  const filterConfig = {
    PROJ: {
      includedKeys: [] as Array<keyof Fund>,
      excludedKeys: ["current_gav", "current_nav"] as Array<keyof Fund>,
      keyIncludes: "projected",
    },
    LIQ: {
      includedKeys: [
        "current_irr",
        "current_gross_moc",
        "current_walt",
        "current_profit",
        "noi_over_last_12_months_noidm",
        "occupancy_rate",
        "capital_invested",
        "current_gav",
        "current_nav",
        "dscr_leased_noidm",
        "debt_yield_leased_noidm",
        "yield_on_cost_leased_noidm",
        "noi_leased_noidm",
      ] as Array<keyof Fund>,
      excludedKeys: [] as Array<keyof Fund>,
      keyIncludes: "liquidation",
    },
  };

  const {
    includedKeys,
    excludedKeys: filterExcludedKeys,
    keyIncludes,
  } = filterConfig[filter];

  return Object.entries(metrics).filter(
    ([key]: [keyof Fund, number | string]) => {
      const isIncludedByFilter =
        key.includes(keyIncludes) ||
        (includedKeys.includes(key) && !filterExcludedKeys.includes(key));

      return isIncludedByFilter && !excludedKeys.includes(key);
    }
  );
};
