import { DistributionAndContributionKPIs } from "@/assets/components/data-display/investing-performance/DistributionAndContributionKPIs";
import { NetContributionsAndDistributions } from "@/assets/components/data-display/investing-performance/NetContributionsAndDistributions";
import { TotalDistributionsBudgetVsActual } from "@/assets/components/data-display/investing-performance/TotalDistributionsBudgetVsActual";
import { TotalDistributionsByType } from "@/assets/components/data-display/investing-performance/TotalDistributionsByType";
import { PropertyMetrics } from "@/assets/components/data-display/PropertyMetrics";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { usePropertyIdFromQueryParams } from "@/assets/hooks/usePropertyIdFromQueryParams";
import { AssetLayout } from "@/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import {
  useDistributionsContributionsKPIs,
  usePropertyNetContributionDistributionChart,
  useTotalDistributionActualLineChart,
  useTotalDistributionBudgetLineChart,
  usePropertyTotalDistributionByTypeDoughnut,
} from "@/assets/services/queries/investing-performance";
import { FromToDateInputs } from "@/commons/components/data-entry/FromToDateInputs";
import { NextPageWithLayout } from "@/commons/typings";
import {
  padDateDigitsWithZero,
  getFirstDateOfYear,
  getLastDayOfLastMonth,
} from "@/commons/utils/dates";
import { Filters, FilterType, OptionType, useFilters } from "in-ui-react";
import { ReactElement, useMemo } from "react";

const defaultFilters = {
  actual_period: {
    from_date: padDateDigitsWithZero(getFirstDateOfYear()),
    to_date: padDateDigitsWithZero(getLastDayOfLastMonth()),
  },
};
const PropertyInvestingPerformance: NextPageWithLayout = () => {
  const propertyId = usePropertyIdFromQueryParams();

  const { filteredOptions, onApply } = useFilters(defaultFilters);

  const filters: FilterType<OptionType>[] = useMemo(() => {
    return [
      {
        key: "actual_period",
        name: "Period",
        type: "custom",
        unDeletable: true,
        render: ({ filteredOptions, onApply, isLoading, onClear }) => {
          return (
            <FromToDateInputs
              onApply={onApply}
              accessor="actual_period"
              filteredOptions={filteredOptions}
              isLoading={isLoading}
              onClear={onClear}
              showApplyButton
            />
          );
        },
      },
    ];
  }, []);

  return (
    <section className="commons-grid">
      <PropertyMetrics
        className="commons-grid-span-full"
        propertyId={propertyId}
      />
      <Filters
        className="commons-grid-span-full"
        filters={filters}
        filteredOptions={filteredOptions}
        onApply={(filters) => onApply(filters)}
        autoInitialFocus={false}
        onClear={() => {
          onApply(defaultFilters);
        }}
        hideAddButton
      />
      <DistributionAndContributionKPIs
        className="commons-grid-span-4"
        filters={{
          investment_entity_code: propertyId,
          ...filteredOptions,
        }}
        useQuery={useDistributionsContributionsKPIs}
      />
      <NetContributionsAndDistributions
        className="commons-grid-span-8"
        filters={{
          investment_entity_code: propertyId,
          ...filteredOptions,
        }}
        useQuery={usePropertyNetContributionDistributionChart}
      />
      <TotalDistributionsByType
        className="commons-grid-span-4"
        filters={{
          investment_entity_code: propertyId,
          ...filteredOptions,
        }}
        useQuery={usePropertyTotalDistributionByTypeDoughnut}
      />
      <TotalDistributionsBudgetVsActual
        className="commons-grid-span-8"
        filters={{
          investment_entity_code: propertyId,
          yardi_property_code: propertyId,
          ...filteredOptions,
        }}
        useActualQuery={useTotalDistributionActualLineChart}
        useBudgetQuery={useTotalDistributionBudgetLineChart}
      />
    </section>
  );
};

PropertyInvestingPerformance.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property - Investing Performance" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyInvestingPerformance;
