import { GenericChoicesSchema } from "@/commons/schemas/filters";
import { privateAxios } from "@/commons/services/clients";

export const getFundsOverviewFilters = async () => {
  const response = await privateAxios.get(
    `/acquisitions/deals/overview-filters/`
  );
  return GenericChoicesSchema().parse(response.data);
};

export const getDealsSummaryFilters = async () => {
  const response = await privateAxios.get(
    `/acquisitions/deals/deals-administration-filters/`
  );
  return GenericChoicesSchema().parse(response.data);
};

export const getDealsByFilters = async () => {
  const response = await privateAxios.get(
    `/acquisitions/deals/deals-by-chart-filters/`
  );
  return GenericChoicesSchema().parse(response.data);
};

export const getPipelineByFilters = async () => {
  const response = await privateAxios.get(
    `/acquisitions/deals/pipeline-summary-chart-filters/`
  );
  return GenericChoicesSchema().parse(response.data);
};

export const getDealRoomFilters = async () => {
  const response = await privateAxios.get(
    `/acquisitions/deals/deals-by-chart-filters/`
  );
  return GenericChoicesSchema().parse(response.data);
};

export const getCompFilters = async () => {
  const response = await privateAxios.get(`/acquisitions/comps/filters/`);
  return GenericChoicesSchema().parse(response.data);
};

export const getDealRoomLabels = async () => {
  const response = await privateAxios.get(
    `/acquisitions/deal-room-items/filters/`
  );
  return GenericChoicesSchema().parse(response.data);
};

export const getEditDealChoices = async () => {
  const response = await privateAxios.get(`/acquisitions/deals/choices/`);
  return GenericChoicesSchema().parse(response.data);
};

export const getCompstackCompChoices = async () => {
  const response = await privateAxios.get(`/data/choices/`);
  return GenericChoicesSchema().parse(response.data);
};
