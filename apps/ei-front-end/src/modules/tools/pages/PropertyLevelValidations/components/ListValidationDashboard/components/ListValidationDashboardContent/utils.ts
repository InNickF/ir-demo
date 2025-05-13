import { PropertyValidation } from "@/modules/tools/typings/property-level-validations";
import { ListValidationDashboardFilter } from "../../../../types";

interface GetPropertiesByStatusParams {
  data: PropertyValidation[];
  status: ListValidationDashboardFilter;
}
export const getPropertiesByStatus = ({
  data,
  status,
}: GetPropertiesByStatusParams) => {
  if (!data) {
    return [];
  }

  const casesValidations: Record<
    ListValidationDashboardFilter,
    () => PropertyValidation[]
  > = {
    all: () => data,
    failed: () => data?.filter((property) => !!property.failed),
    succeeded: () => data?.filter((property) => !property.failed),
  };
  const validation = casesValidations[status];
  return validation ? validation() : data;
};

interface GetPropertiesBySearchParams {
  data: PropertyValidation[];
  search: string;
}
export const getPropertiesBySearch = ({
  data,
  search,
}: GetPropertiesBySearchParams) => {
  if (!data) {
    return [];
  }

  return data.filter((property) => {
    return (
      property?.property_code?.toLowerCase().includes(search.toLowerCase()) ||
      property?.date?.toLowerCase().includes(search.toLowerCase())
    );
  });
};
