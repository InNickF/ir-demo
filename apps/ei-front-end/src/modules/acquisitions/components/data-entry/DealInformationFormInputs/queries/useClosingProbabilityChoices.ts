import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useClosingProbabilityChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  const options =
    dealChoices?.find((filter) => filter.key === "law_firm_closing_probability")
      ?.options || [];

  return {
    options,
    isFiltersLoading,
  };
};
