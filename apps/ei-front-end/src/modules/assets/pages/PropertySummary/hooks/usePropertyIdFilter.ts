import { usePropertySummaryFilters } from "@/modules/assets/services/queries/filters";
import { FiltersPayloadType, useFilters } from "in-ui-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface PropertyIdFilterProps<T extends FiltersPayloadType> {
  defaultFilters?: T;
}
export const usePropertyIdFilter = <T extends FiltersPayloadType>(
  { defaultFilters }: PropertyIdFilterProps<T> = { defaultFilters: null }
) => {
  const router = useRouter();

  const { filteredOptions, onApply } = useFilters({
    ...defaultFilters,
    properties: localStorage.getItem("propertyId") || "1230-llc",
  });

  const { data: assetProperty, isLoading: isAssetPropertyLoading } =
    usePropertySummaryFilters();

  const selectedProperty = filteredOptions?.properties.toString();

  useEffect(() => {
    localStorage.setItem("propertyId", selectedProperty);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, propertyId: selectedProperty },
      },
      undefined,
      { shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProperty]);

  return {
    filteredOptions,
    onApply,
    assetProperty,
    isAssetPropertyLoading,
    selectedProperty,
  };
};
