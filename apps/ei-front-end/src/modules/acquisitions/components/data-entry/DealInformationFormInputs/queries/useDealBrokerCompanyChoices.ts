import { useEditDealChoices } from "@/modules/acquisitions/services/queries/filters";

export const useDealBrokerCompanyChoices = () => {
  const { data: dealChoices = [], isLoading: isFiltersLoading } =
    useEditDealChoices();

  const options =
    dealChoices?.find((filter) => filter.key === "broker_company")?.options ||
    [];

  return {
    options,
    isFiltersLoading,
  };
};
