import { useTenantBreakdowns } from "@/modules/assets/services/queries/asset-growth";
import { useLegacyAssetGrowthFilters } from "@/modules/assets/services/queries/filters";
import {
  tenantBreakdownGroupBy,
  tenantBreakdownMetrics,
} from "@/modules/assets/utils/asset-growth";
import { Filters, Title, useFilters } from "in-ui-react";
import { AssetLocation } from "./components/AssetLocation";
import { TenantBreakdown } from "./components/TenantBreakdown";

export type TenancyCalculationType = typeof tenantBreakdownMetrics[number];
export type TenancyGroupType = typeof tenantBreakdownGroupBy[number];

export const CurrentTenancySection = () => {
  const { filteredOptions, onApply } = useFilters({
    metric: "rentable-area" as TenancyCalculationType,
    group_by: "status" as TenancyGroupType,
  });

  const { data: assetGrowthFilters, isLoading: isAssetGrowthFiltersLoading } =
    useLegacyAssetGrowthFilters();

  const { data: tenantBreakdowns, isLoading } =
    useTenantBreakdowns(filteredOptions);

  const sortedTenantBreakdowns = Array.isArray(tenantBreakdowns)
    ? tenantBreakdowns
        .sort((a, b) => b.value - a.value)
        .map((item) => item.category)
    : [];

  return (
    <>
      <div className="portfolio-growth-page__grid-full">
        <Title kind="h2">Current Tenancy</Title>
      </div>
      <div className="portfolio-growth-page__grid-full">
        <Filters
          filters={assetGrowthFilters ?? []}
          filteredOptions={filteredOptions}
          onApply={onApply}
          kind="glass"
          isLoading={isAssetGrowthFiltersLoading}
        />
      </div>
      <TenantBreakdown
        calculationType={filteredOptions.metric}
        data={tenantBreakdowns}
        isLoading={isLoading}
        className="portfolio-growth-page__grid-span-4"
      />
      <AssetLocation
        filters={filteredOptions}
        labels={sortedTenantBreakdowns}
        className="portfolio-growth-page__grid-span-8"
      />
    </>
  );
};
