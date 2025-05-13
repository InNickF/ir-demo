import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const PortfolioLoanFilters = ["lender_name", "saddr1"] as const;
type PortfolioLoanFilters = typeof PortfolioLoanFilters[number];

export const usePortfolioLoanFilter = () => {
  const [portfolioLoanFilter, setPortfolioLoanFilter] =
    useState<PortfolioLoanFilters>(PortfolioLoanFilters[0]);
  const portfolioLoanItems: ButtonGroupItem[] = [
    {
      key: "lender_name",
      text: "Lenders",
      size: "small",
      onClick: (key) => setPortfolioLoanFilter(key as PortfolioLoanFilters),
    },
    {
      key: "saddr1",
      text: "Assets",
      size: "small",
      onClick: (key) => setPortfolioLoanFilter(key as PortfolioLoanFilters),
    },
  ];

  return {
    portfolioLoanFilter,
    portfolioLoanItems,
  };
};
