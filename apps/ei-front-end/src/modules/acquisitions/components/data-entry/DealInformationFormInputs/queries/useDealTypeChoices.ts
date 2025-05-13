import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useDealTypeChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  const options =
    dealChoices?.find((filter) => filter.key === "type")?.options || [];

  return {
    options,
    isFiltersLoading,
  };
};
