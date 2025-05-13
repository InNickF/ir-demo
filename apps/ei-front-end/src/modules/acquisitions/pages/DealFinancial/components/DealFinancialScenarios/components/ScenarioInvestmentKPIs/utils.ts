// Table keys for the left and right columns of the Investment KPIs table

export const leftInvestmentKPIsTableKeys = [
  "sources_and_uses_at_closing",
  "total_sources_and_uses",
];

export const rightInvestmentKPIsTableKeys = [
  "debt_assumptions",
  "disposition_assumptions",
  "key_metrics",
  "sensitivity_analysis",
  "stabilized_rent_roll",
];

export const fullWidthInvestmentKPIsTableKeys = [
  "market_leasing_assumptions",
  "in_place_rent_roll",
];

// Create a map of key-index pairs for quick lookups
export const leftKeyIndexMap = new Map(
  leftInvestmentKPIsTableKeys.map((key, index) => [key, index])
);

export const rightKeyIndexMap = new Map(
  rightInvestmentKPIsTableKeys.map((key, index) => [key, index])
);
