import { OperationalFinancialPerformance } from "@/assets/components/data-display/OperationalFinancialPerformance";
import { useOFPComparisonButtonGroupFilters } from "@/assets/components/data-display/OperationalFinancialPerformance/hooks/useOFPComparisonButtonGroupFilters";
import { useOFPHistoricalButtonGroupFilters } from "@/assets/components/data-display/OperationalFinancialPerformance/hooks/useOFPHistoricalButtonGroupFilters";
import { useOFPSelectedMetricState } from "@/assets/components/data-display/OperationalFinancialPerformance/hooks/useOFPSelectedMetricState";
import { OperationalFinancialPerformanceFilters } from "@/assets/components/data-entry/OperationalFinancialPerformanceFilters";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PortfolioLayout } from "@/assets/layouts/PortfolioLayout";
import { useAssetsFilters } from "@/assets/services/queries/filters";
import {
  useGetPortfolioOperationalFinancialPerformanceHistoricalMetrics,
  useGetPortfolioOperationalFinancialPerformanceMetrics,
  useGetPortfolioOperationalStatement,
} from "@/assets/services/queries/portfolio";
import {
  convertToTitleCase,
  humanizeSnakeCase,
} from "@/commons/model-in/formatters/utils";
import { NextPageWithLayout } from "@/commons/typings";
import { FilterType, SelectFilterType, useFilters } from "in-ui-react";
import { ReactElement, useMemo } from "react";
import { FundOperationalStatement } from "./components/FundOperationalStatement";

const PortfolioOperationalFinancialPerformance: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters({
    actual_period: {
      from_date: "01/01/2025",
      to_date: "02/28/2025",
    },
    fund_name: "Industrial Fund Example",
    status: "all",
  });

  const { data: filters, isLoading: isLoadingFilters } = useAssetsFilters();
  const memoFilters: FilterType[] = useMemo(() => {
    const validFilters = ["fund", "status"];
    const keyFiltersMapping = {
      fund: "fund_name",
      status: "status",
    };
    const apiFilters =
      filters
        ?.filter((filter) => validFilters.includes(filter.key))
        ?.map(
          (filter) =>
            ({
              ...filter,
              key: keyFiltersMapping[filter.key] || filter.key,
              name: convertToTitleCase(humanizeSnakeCase(filter.key)),
              unDeletable: true,
              type: "simple-select",
            } as SelectFilterType)
        ) || [];

    return apiFilters;
  }, [filters]);

  const { activeHistoricalVariant, historicalVariantButtonFilters } =
    useOFPHistoricalButtonGroupFilters();
  const { activeComparison, comparisonButtonsFilters } =
    useOFPComparisonButtonGroupFilters();

  const {
    data: tableData,
    isLoading: isLoadingTable,
    isRefetching: isRefetchingTable,
  } = useGetPortfolioOperationalFinancialPerformanceMetrics({
    reference: activeComparison,
    fund_name: "Industrial Fund Example",
    status: "all",
    actual_period: {
      from_date: "01/01/2025",
      to_date: "02/28/2025",
    },
  });

  const [selectedMetric, setSelectedMetric] = useOFPSelectedMetricState({
    data: tableData,
  });

  const {
    data: historicalData,
    isLoading: isLoadingHistorical,
    isRefetching: isRefetchingHistorical,
  } = useGetPortfolioOperationalFinancialPerformanceHistoricalMetrics({
    reference: activeComparison,
    variant: activeHistoricalVariant,
    fund_name: "Industrial Fund Example",
    status: "all",
    actual_period: {
      from_date: "01/01/2025",
      to_date: "02/28/2025",
    },
  });

  const {
    data: statementData,
    isLoading: isLoadingStatement,
    isRefetching: isRefetchingStatement,
  } = useGetPortfolioOperationalStatement({
    fund_name: filteredOptions?.fund_name,
    status: filteredOptions?.status,
  });

  return (
    <main className="grid grid-cols-1 gap-4">
      <section>
        <OperationalFinancialPerformanceFilters
          activeComparison={activeComparison}
          filteredOptions={filteredOptions}
          isLoading={isLoadingFilters}
          onApply={onApply}
          onClear={() =>
            onApply({
              actual_period: {
                from_date: "01/01/2025",
                to_date: "02/28/2025",
              },
              fund_name: filteredOptions?.fund_name,
              status: "all",
            })
          }
          extraFilters={memoFilters}
        />
      </section>
      <OperationalFinancialPerformance
        title="Fund Performance"
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
      <FundOperationalStatement
        data={statementData}
        isLoading={isLoadingStatement}
        isRefetching={isRefetchingStatement}
        activeComparison={activeComparison}
      />
    </main>
  );
};

PortfolioOperationalFinancialPerformance.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Portfolio Operational Financial Performance" />
      <PortfolioLayout
        title="Operational Financial Performance"
        headerSize="h1"
      >
        {page}
      </PortfolioLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PortfolioOperationalFinancialPerformance;
