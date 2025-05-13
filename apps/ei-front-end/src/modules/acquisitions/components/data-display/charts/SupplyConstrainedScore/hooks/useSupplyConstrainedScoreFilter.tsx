import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const SupplyConstrainedScore = ["supply", "demand"] as const;
type SupplyConstrainedScore = typeof SupplyConstrainedScore[number];

export const useSupplyConstrainedScoreFilter = () => {
  const [supplyConstrainedScore, setSupplyConstrainedScore] =
    useState<SupplyConstrainedScore>(SupplyConstrainedScore[0]);

  const supplyConstrainedScoreItems: ButtonGroupItem[] = [
    {
      key: "supply",
      text: "Supply",
      size: "small",
      onClick: (key) =>
        setSupplyConstrainedScore(key as SupplyConstrainedScore),
    },
    {
      key: "demand",
      text: "Demand",
      size: "small",
      onClick: (key) =>
        setSupplyConstrainedScore(key as SupplyConstrainedScore),
    },
  ];
  const hiddenClasses = "invisible absolute -z-control top-0";

  const supplyChartClasses =
    supplyConstrainedScore === "supply"
      ? "generic-entrance-animation"
      : hiddenClasses;

  const demandChartClasses =
    supplyConstrainedScore === "demand"
      ? "generic-entrance-animation"
      : hiddenClasses;

  return {
    supplyConstrainedScore,
    supplyConstrainedScoreItems,
    supplyChartClasses,
    demandChartClasses,
  };
};
