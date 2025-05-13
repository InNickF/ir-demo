import { ButtonGroupItem } from "in-ui-react";
import { useMemo, useState } from "react";
import { DealFinancialSections } from "../types";
import { dealFinancialSectionsComponents } from "../utils";

export const useFinancialSections = () => {
  const [activeSection, setActiveSection] =
    useState<DealFinancialSections>("scenarios");

  const CurrentSection = useMemo(
    () => dealFinancialSectionsComponents[activeSection],
    [activeSection]
  );

  const dealFinancialSectionsButtonGroupItems: ButtonGroupItem[] = [
    {
      key: "scenarios",
      text: "Scenarios",
      onClick: (key: DealFinancialSections) => setActiveSection(key),
    },
    {
      key: "capex",
      text: "CAPEX",
      onClick: (key: DealFinancialSections) => setActiveSection(key),
    },
  ];

  return {
    activeSection,
    CurrentSection,
    dealFinancialSectionsButtonGroupItems,
  };
};
