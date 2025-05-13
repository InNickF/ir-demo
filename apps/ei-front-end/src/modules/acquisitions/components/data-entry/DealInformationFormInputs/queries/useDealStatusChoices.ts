import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useDealStatusChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  const options =
    dealChoices?.find((filter) => filter.key === "status")?.options || [];

  return {
    options,
    isFiltersLoading,
  };
};
