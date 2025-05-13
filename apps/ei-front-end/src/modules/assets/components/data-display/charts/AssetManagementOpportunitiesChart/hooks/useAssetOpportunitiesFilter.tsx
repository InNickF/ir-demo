import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const AssetOpportunitiesFilters = ["all", "active"] as const;
type AssetOpportunitiesFilters = typeof AssetOpportunitiesFilters[number];

export const useAssetOpportunitiesFilter = () => {
  const [assetOpportunitiesFilter, setAssetOpportunitiesFilter] =
    useState<AssetOpportunitiesFilters>(AssetOpportunitiesFilters[0]);
  const assetOpportunitiesFilterItems: ButtonGroupItem[] = [
    {
      key: "all",
      text: "All",
      size: "small",
      onClick: (key) =>
        setAssetOpportunitiesFilter(key as AssetOpportunitiesFilters),
    },
    {
      key: "active",
      text: "Active",
      size: "small",
      onClick: (key) =>
        setAssetOpportunitiesFilter(key as AssetOpportunitiesFilters),
    },
  ];

  return {
    assetOpportunitiesFilter,
    assetOpportunitiesFilterItems,
  };
};
