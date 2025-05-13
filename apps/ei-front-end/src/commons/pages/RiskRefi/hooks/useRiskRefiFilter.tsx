import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const riskRefiFilters = ["risk", "refi"] as const;
type RiskRefiFilters = typeof riskRefiFilters[number];

export const useRiskRefiFilters = () => {
  const [riskRefiFilter, setRiskRefiFilter] = useState<RiskRefiFilters>(
    riskRefiFilters[0]
  );
  const riskRefiItems: ButtonGroupItem[] = [
    {
      key: "risk",
      text: "Risk Information",
      onClick: (key) => setRiskRefiFilter(key as RiskRefiFilters),
    },
    {
      key: "refi",
      text: "Refi Information",
      onClick: (key) => setRiskRefiFilter(key as RiskRefiFilters),
    },
  ];

  const riskClasses = riskRefiFilter === "risk" ? undefined : "hidden";
  const refiClasses = riskRefiFilter === "refi" ? undefined : "hidden";

  return {
    riskRefiFilter,
    riskRefiItems,
    riskClasses,
    refiClasses,
  };
};
