import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const compFilters = ["all", "lease-comps", "sale-comps"] as const;
type CompFilters = typeof compFilters[number];

export const useButtonGroupCompUIFilter = () => {
  const [compFilter, setCompFilter] = useState<CompFilters>(compFilters[0]);
  const compFilterItems: ButtonGroupItem[] = [
    {
      key: "all",
      text: "All",
      onClick: (key) => setCompFilter(key as CompFilters),
    },
    {
      key: "lease-comps",
      text: "Lease Comps",
      onClick: (key) => setCompFilter(key as CompFilters),
    },
    {
      key: "sale-comps",
      text: "Sale Comps",
      onClick: (key) => setCompFilter(key as CompFilters),
    },
  ];

  const leaseCompClasses =
    compFilter === "all" || compFilter === "lease-comps" ? undefined : "hidden";
  const allHeadingClasses = compFilter === "all" ? "-mb-5" : "hidden -mb-5";
  const salesCompsClasses =
    compFilter === "all" || compFilter === "sale-comps" ? undefined : "hidden";

  return {
    compFilter,
    compFilterItems,
    leaseCompClasses,
    allHeadingClasses,
    salesCompsClasses,
  };
};
