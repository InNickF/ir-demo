import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useFundChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  return {
    options:
      dealChoices?.find((filter) => filter.key === "fund")?.options || [],
    isFiltersLoading,
  };
};
