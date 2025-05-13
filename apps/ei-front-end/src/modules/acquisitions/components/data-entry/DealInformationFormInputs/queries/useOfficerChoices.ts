import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useOfficerChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  return {
    options:
      dealChoices?.find((filter) => filter.key === "officer")?.options || [],
    isFiltersLoading,
  };
};
