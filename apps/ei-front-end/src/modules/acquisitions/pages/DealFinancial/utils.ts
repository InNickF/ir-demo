import { FC } from "react";
import { DealFinancialCapex } from "./components/DealFinancialCapex";
import { DealFinancialScenarios } from "./components/DealFinancialScenarios";
import { DealFinancialSections } from "./types";

export const dealFinancialSections = ["scenarios", "capex"] as const;

export const dealFinancialSectionsComponents: Record<
  DealFinancialSections,
  FC
> = {
  scenarios: DealFinancialScenarios,
  capex: DealFinancialCapex,
};
