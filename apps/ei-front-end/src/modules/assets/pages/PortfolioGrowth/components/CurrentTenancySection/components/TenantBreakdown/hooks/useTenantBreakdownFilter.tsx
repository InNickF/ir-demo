import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const tenantBreakdownFilters = ["graph", "table"] as const;
type TenantBreakdownFilters = typeof tenantBreakdownFilters[number];

export const useTenantBreakdownFilters = () => {
  const [tenantBreakdownFilter, setTenantBreakdownFilter] =
    useState<TenantBreakdownFilters>(tenantBreakdownFilters[0]);

  const tenantBreakdownItems: ButtonGroupItem[] = [
    {
      key: "graph",
      text: "Graph",
      size: "small",
      onClick: (key) => setTenantBreakdownFilter(key as TenantBreakdownFilters),
    },
    {
      key: "table",
      text: "Table",
      size: "small",
      onClick: (key) => setTenantBreakdownFilter(key as TenantBreakdownFilters),
    },
  ];

  return {
    tenantBreakdownFilter,
    tenantBreakdownItems,
  };
};
