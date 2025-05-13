import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { NextPageWithLayout } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import {
  getFirstDateOfYear,
  getLastDayOfLastMonth,
  padDateDigitsWithZero,
} from "@/commons/utils/dates";
import { FilterType, SelectFilterType, useFilters } from "in-ui-react";
import { ReactElement, useMemo } from "react";
import { OperationalFinancialPerformance } from "../../components/data-display/OperationalFinancialPerformance";
import { useOFPComparisonButtonGroupFilters } from "../../components/data-display/OperationalFinancialPerformance/hooks/useOFPComparisonButtonGroupFilters";
import { useOFPHistoricalButtonGroupFilters } from "../../components/data-display/OperationalFinancialPerformance/hooks/useOFPHistoricalButtonGroupFilters";
import { useOFPSelectedMetricState } from "../../components/data-display/OperationalFinancialPerformance/hooks/useOFPSelectedMetricState";
import { OperationalFinancialPerformanceFilters } from "../../components/data-entry/OperationalFinancialPerformanceFilters";
import { useAssetsFilters } from "../../services/queries/filters";
import {
  useGetPortfolioOperationalFinancialPerformanceHistoricalMetrics,
  useGetPortfolioOperationalFinancialPerformanceMetrics,
  useGetPortfolioOperationalStatement,
} from "../../services/queries/portfolio";
import { getFundsURL } from "../../utils/redirects/funds-redirects";
import { FundOperationalStatement } from "../PortfolioOperationalFinancialPerformance/components/FundOperationalStatement";

const FundOperationalFinancialPerformance: NextPageWithLayout = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const staticFilters = {
    fund_name: "Industrial Fund Example",
    status: "all",
    actual_period: {
      from_date: "01/01/2025",
      to_date: "02/28/2025",
    },
  };

  const { filteredOptions, onApply } = useFilters(staticFilters);

  const computedFilters = useMemo(() => {
    return {
      ...filteredOptions,
      fund_name: fundId,
    };
  }, [filteredOptions, fundId]);

  const { data: filters, isLoading: isLoadingFilters } = useAssetsFilters();
  const memoFilters: FilterType[] = useMemo(() => {
    const validFilters = ["status"];
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
    fund_name: computedFilters?.fund_name,
    status: "all",
  });

  return (
    <main className="grid grid-cols-1 gap-4">
      <section>
        <OperationalFinancialPerformanceFilters
          activeComparison={activeComparison}
          filteredOptions={computedFilters}
          isLoading={isLoadingFilters}
          onApply={onApply}
          onClear={() => null}
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

FundOperationalFinancialPerformance.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Operational Financial Performance" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundOperationalFinancialPerformance;
