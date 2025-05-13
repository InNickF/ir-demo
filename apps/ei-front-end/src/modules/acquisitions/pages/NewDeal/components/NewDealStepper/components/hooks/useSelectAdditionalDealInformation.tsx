import { ButtonGroupItem } from "in-ui-react";
import { useState } from "react";

const additionalDealInformationFilters = [
  "back_of_the_napkin",
  "underwriting_information",
] as const;

export type AdditionalDealInformationFilters =
  typeof additionalDealInformationFilters[number];

export const useSelectAdditionalDealInformation = () => {
  const [additionalDealInformationFilter, setAdditionalDealInformationFilter] =
    useState<AdditionalDealInformationFilters>(
      additionalDealInformationFilters[0]
    );

  const additionalDealInformationOptions: ButtonGroupItem[] = [
    {
      key: "back_of_the_napkin",
      text: "Back of the Napkin",
      onClick: (key) =>
        setAdditionalDealInformationFilter(
          key as AdditionalDealInformationFilters
        ),
    },
    {
      key: "underwriting_information",
      text: "Underwriting File",
      onClick: (key) =>
        setAdditionalDealInformationFilter(
          key as AdditionalDealInformationFilters
        ),
    },
  ];

  return {
    additionalDealInformationFilter,
    additionalDealInformationOptions,
  };
};
