import { AssetManagementOpportunitiesChart } from "@/assets/components/data-display/charts/AssetManagementOpportunitiesChart";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { GetTenantsBreakdownFilters } from "@/assets/services/api/asset-growth";
import { useTenantBreakdowns } from "@/assets/services/queries/asset-growth";
import { useAssetGrowthFilters } from "@/assets/services/queries/filters";
import { getFundsURL } from "@/assets/utils/redirects/funds-redirects";
import { GeneralAssetsFilters } from "@/commons/components/data-entry/GeneralAssetsFilters";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { NextPageWithLayout } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import { Filters, SelectFilterType, Title, useFilters } from "in-ui-react";
import { ReactElement, useMemo } from "react";
import {
  TenancyCalculationType,
  TenancyGroupType,
} from "../PortfolioGrowth/components/CurrentTenancySection";
import { AssetLocation } from "../PortfolioGrowth/components/CurrentTenancySection/components/AssetLocation";
import { TenantBreakdown } from "../PortfolioGrowth/components/CurrentTenancySection/components/TenantBreakdown";

const FundGrowth: NextPageWithLayout = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const {
    filteredOptions: generalFilteredOptions,
    onApply: onApplyGeneralFilters,
  } = useFilters({
    ...defaultFundStatusFilteredOptions,
  });

  const computedGeneralFilteredOptions = useMemo(() => {
    return {
      ...generalFilteredOptions,
      fund: fundId,
    };
  }, [generalFilteredOptions, fundId]);

  const {
    filteredOptions: filteredGrowthOptions,
    onApply: onApplyGrowthFilters,
  } = useFilters({
    metric: "annual-rent" as TenancyCalculationType,
    group_by: "status" as TenancyGroupType,
  });

  const computedFilteredGrowthOptions = useMemo(() => {
    return {
      ...filteredGrowthOptions,
      fund: fundId,
      status: "active",
    };
  }, [fundId, filteredGrowthOptions]) as GetTenantsBreakdownFilters;

  const {
    data: assetGrowthRawFilters = [],
    isLoading: isAssetGrowthFiltersLoading,
  } = useAssetGrowthFilters();

  const assetGrowthFilters = useMemo(() => {
    return (
      assetGrowthRawFilters?.map(
        (filter) =>
          ({
            ...filter,
            name: convertToTitleCase(humanizeSnakeCase(filter?.name)),
            type: "simple-select",
            unDeletable: true,
          } as SelectFilterType)
      ) || []
    );
  }, [assetGrowthRawFilters]);

  const {
    data: tenantBreakdowns = [],
    isLoading,
    isRefetching,
  } = useTenantBreakdowns(computedFilteredGrowthOptions);

  const sortedTenantBreakdowns = useMemo(() => {
    return tenantBreakdowns
      .sort((a, b) => b.value - a.value)
      .map((item) => item.category);
  }, [tenantBreakdowns]);

  return (
    <div className="commons-grid">
      <GeneralAssetsFilters
        className="commons-grid-span-full"
        filteredOptions={computedGeneralFilteredOptions}
        onApply={onApplyGeneralFilters}
        disabledKeys={["fund"]}
      />
      <div className="commons-grid-span-full">
        <Title kind="h2">Current Tenancy</Title>
      </div>
      <div className="commons-grid-span-full">
        <Filters
          filters={assetGrowthFilters}
          filteredOptions={computedFilteredGrowthOptions}
          onApply={onApplyGrowthFilters}
          kind="glass"
          isLoading={isAssetGrowthFiltersLoading}
          autoInitialFocus={false}
        />
      </div>
      <TenantBreakdown
        calculationType={computedFilteredGrowthOptions.metric}
        data={tenantBreakdowns}
        isLoading={isLoading}
        isRefetching={isRefetching}
        className="commons-grid-span-4"
      />
      <AssetLocation
        filters={computedFilteredGrowthOptions}
        labels={sortedTenantBreakdowns}
        className="commons-grid-span-8"
      />
      <div className="commons-grid-span-full">
        <Title kind="h2">Active Asset Management</Title>
      </div>
      <AssetManagementOpportunitiesChart
        className="commons-grid-span-full"
        fund={fundId}
      />
    </div>
  );
};

FundGrowth.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Growth" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundGrowth;
