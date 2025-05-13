import { PropertyValidation } from "@/modules/tools/typings/property-level-validations";
import { ListValidationDashboardFilter, PanelFilter } from "../../../../types";
import { listValidationDashboardFilters } from "../../../../utils";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";

type ValidationSummary = Record<ListValidationDashboardFilter, number>;
export const listValidationDashboardCSSPrefix = "plv-list-validation-dashboard";

export const listValidationDashboardPanelCSSPrefix = `${listValidationDashboardCSSPrefix}__panel`;

export const getValidationSummary = (
  data: PropertyValidation[]
): ValidationSummary => {
  const summary: ValidationSummary = {
    all: data?.length,
    succeeded: 0,
    failed: 0,
  };

  data?.forEach((validation) => {
    if (validation.failed) {
      summary.failed += 1;
    } else {
      summary.succeeded += 1;
    }
  });

  return summary;
};

export const getPropertyValidationFilters = (
  data: PropertyValidation[]
): PanelFilter[] => {
  const quantities = getValidationSummary(data);
  const colorMap: Record<ListValidationDashboardFilter, PanelFilter["color"]> =
    {
      all: "primary",
      failed: "error",
      succeeded: "success",
    };

  const descriptionMap: Record<
    ListValidationDashboardFilter,
    PanelFilter["description"]
  > = {
    all: "All Properties",
    failed: "Properties with at least one failed validation",
    succeeded: "Properties with all validations succeeded",
  };

  return listValidationDashboardFilters.map((filter) => {
    return {
      label: convertToTitleCase(filter),
      quantity: quantities[filter],
      value: filter,
      color: colorMap[filter],
      description: descriptionMap[filter],
    } as PanelFilter;
  });
};
