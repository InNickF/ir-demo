import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useOfficerStatusChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  return {
    options:
      dealChoices?.find((filter) => filter.key === "officer_status")?.options ||
      [],
    isFiltersLoading,
  };
};
