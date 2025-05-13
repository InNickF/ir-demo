import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const propertyEditFilters = [
  "information",
  "critical_dates",
  "photos",
  "benchmark",
] as const;

type PropertyEditFilters = typeof propertyEditFilters[number];

export const useButtonGroupPropertyEdit = () => {
  const [propertyEditFilter, setPropertyEditFilter] =
    useState<PropertyEditFilters>(propertyEditFilters[0]);

  const propertyEditFilterItems: ButtonGroupItem[] = [
    {
      key: "information",
      text: "Information",
      onClick: (key) => setPropertyEditFilter(key as PropertyEditFilters),
    },
    {
      key: "critical_dates",
      text: "Critical Dates",
      onClick: (key) => setPropertyEditFilter(key as PropertyEditFilters),
    },
    {
      key: "photos",
      text: "Photos",
      onClick: (key) => setPropertyEditFilter(key as PropertyEditFilters),
    },
    /*{
      key: "benchmark",
      text: "Benchmark",
      onClick: (key) => setPropertyEditFilter(key as PropertyEditFilters),
    }, */
  ];

  const propertyEditInformationClasses =
    propertyEditFilter === "information" ? undefined : "hidden";

  const propertyEditPhotosClasses =
    propertyEditFilter === "photos" ? undefined : "hidden";

  const propertyEditBenchmarkClasses =
    propertyEditFilter === "benchmark" ? undefined : "hidden";

  const propertyEditCriticalDatesClasses =
    propertyEditFilter === "critical_dates" ? undefined : "hidden";

  return {
    propertyEditFilter,
    propertyEditFilterItems,
    propertyEditInformationClasses,
    propertyEditCriticalDatesClasses,
    propertyEditPhotosClasses,
    propertyEditBenchmarkClasses,
  };
};
