import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const portfolioLoanFilters = ["lender_name", "property_name"] as const;
type PortfolioLoanFilters = typeof portfolioLoanFilters[number];

export const usePortfolioLoanFilter = () => {
  const [portfolioLoanFilter, setPortfolioLoanFilter] =
    useState<PortfolioLoanFilters>(portfolioLoanFilters[0]);
  const portfolioLoanItems: ButtonGroupItem[] = [
    {
      key: "lender_name",
      text: "Lenders",
      size: "small",
      onClick: (key) => setPortfolioLoanFilter(key as PortfolioLoanFilters),
    },
    {
      key: "loan_name",
      text: "Loans",
      size: "small",
      onClick: (key) => setPortfolioLoanFilter(key as PortfolioLoanFilters),
    },
  ];

  return {
    portfolioLoanFilter,
    portfolioLoanItems,
  };
};
