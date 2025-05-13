import { OperationalFinancialPerformance } from "@/assets/components/data-display/OperationalFinancialPerformance";
import { useOFPComparisonButtonGroupFilters } from "@/assets/components/data-display/OperationalFinancialPerformance/hooks/useOFPComparisonButtonGroupFilters";
import { useOFPHistoricalButtonGroupFilters } from "@/assets/components/data-display/OperationalFinancialPerformance/hooks/useOFPHistoricalButtonGroupFilters";
import { useOFPSelectedMetricState } from "@/assets/components/data-display/OperationalFinancialPerformance/hooks/useOFPSelectedMetricState";
import { OperationalFinancialPerformanceFilters } from "@/assets/components/data-entry/OperationalFinancialPerformanceFilters";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { usePropertyIdFromQueryParams } from "@/assets/hooks/usePropertyIdFromQueryParams";
import { AssetLayout } from "@/modules/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import {
  useGetPropertyOperationalFinancialPerformanceHistorical,
  useGetPropertyOperationalFinancialPerformanceMetrics,
} from "@/assets/services/queries/properties";
import { NextPageWithLayout } from "@/commons/typings";
import {
  getFirstDateOfYear,
  getLastDayOfLastMonth,
  padDateDigitsWithZero,
} from "@/commons/utils/dates";
import { useFilters } from "in-ui-react";
import { ReactElement } from "react";
import { OperationalStatementCard } from "./components/OperationalStatementCard";

const PropertyOperationalFinancialPerformance: NextPageWithLayout = () => {
  const propertyId = usePropertyIdFromQueryParams();
  const { filteredOptions, onApply } = useFilters({
    actual_period: {
      from_date: padDateDigitsWithZero(getFirstDateOfYear()),
      to_date: padDateDigitsWithZero(getLastDayOfLastMonth()),
    },
  });

  const { activeHistoricalVariant, historicalVariantButtonFilters } =
    useOFPHistoricalButtonGroupFilters();
  const { activeComparison, comparisonButtonsFilters } =
    useOFPComparisonButtonGroupFilters();

  const {
    data: tableData,
    isLoading: isLoadingTable,
    isRefetching: isRefetchingTable,
  } = useGetPropertyOperationalFinancialPerformanceMetrics({
    yardi_property_code: propertyId as string,
    reference: activeComparison,
    ...filteredOptions,
  });

  const [selectedMetric, setSelectedMetric] = useOFPSelectedMetricState({
    data: tableData,
  });

  const {
    data: historicalData,
    isLoading: isLoadingHistorical,
    isRefetching: isRefetchingHistorical,
  } = useGetPropertyOperationalFinancialPerformanceHistorical({
    yardi_property_code: propertyId as string,
    reference: activeComparison,
    variant: activeHistoricalVariant,
    ...filteredOptions,
  });

  return (
    <>
      <section className="pb-6">
        <OperationalFinancialPerformanceFilters
          activeComparison={activeComparison}
          filteredOptions={filteredOptions}
          onApply={onApply}
          onClear={() =>
            onApply({
              actual_period: {
                from_date: padDateDigitsWithZero(getFirstDateOfYear()),
                to_date: padDateDigitsWithZero(getLastDayOfLastMonth()),
              },
            })
          }
        />
      </section>
      <OperationalFinancialPerformance
        title="Property Performance"
        activeHistoricalVariant={activeHistoricalVariant}
        historicalVariantButtonFilters={historicalVariantButtonFilters}
        historicalData={historicalData}
        isLoadingHistorical={isLoadingHistorical}
        isRefetchingHistorical={isRefetchingHistorical}
        activeComparison={activeComparison}
        comparisonButtonsFilters={comparisonButtonsFilters}
        tableData={tableData}
        isLoadingTable={isLoadingTable}
        isRefetchingTable={isRefetchingTable}
        selectedMetric={selectedMetric}
        onSelectMetric={setSelectedMetric}
      />
      <OperationalStatementCard
        activeComparison={activeComparison}
        filteredOptions={filteredOptions}
      />
    </>
  );
};

PropertyOperationalFinancialPerformance.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property - Operational Financial Performance" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyOperationalFinancialPerformance;
