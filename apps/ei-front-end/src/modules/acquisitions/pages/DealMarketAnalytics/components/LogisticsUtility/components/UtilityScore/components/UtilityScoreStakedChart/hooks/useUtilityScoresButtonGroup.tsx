import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const utilityScoresOptions = ["top", "all"] as const;
type UtilityScoresOptions = typeof utilityScoresOptions[number];

export const useUtilityScoresButtonGroup = () => {
  const [selectedUtilityScore, setSelectedUtilityScore] =
    useState<UtilityScoresOptions>(utilityScoresOptions[0]);

  const utilityScoresItems: ButtonGroupItem[] = [
    {
      key: "top",
      text: "Top 3",
      size: "small",
      onClick: (key) => setSelectedUtilityScore(key as UtilityScoresOptions),
    },
    {
      key: "all",
      text: "All",
      size: "small",
      onClick: (key) => setSelectedUtilityScore(key as UtilityScoresOptions),
    },
  ];

  return {
    selectedUtilityScore,
    utilityScoresItems,
  };
};
