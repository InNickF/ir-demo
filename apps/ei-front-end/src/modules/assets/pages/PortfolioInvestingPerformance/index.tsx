import { DistributionAndContributionKPIs } from "@/assets/components/data-display/investing-performance/DistributionAndContributionKPIs";
import { NetContributionsAndDistributions } from "@/assets/components/data-display/investing-performance/NetContributionsAndDistributions";
import { TotalDistributionsBudgetVsActual } from "@/assets/components/data-display/investing-performance/TotalDistributionsBudgetVsActual";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PortfolioLayout } from "@/assets/layouts/PortfolioLayout";
import { useAssetsFilters } from "@/assets/services/queries/filters";
import {
  useDistributionsContributionsKPIs,
  usePropertyNetContributionDistributionChart,
  useTotalDistributionActualLineChart,
  useTotalDistributionBudgetLineChart,
} from "@/assets/services/queries/investing-performance";
import { FromToDateInputs } from "@/commons/components/data-entry/FromToDateInputs";
import { NextPageWithLayout } from "@/commons/typings";
import {
  getFirstDateOfYear,
  getLastDayOfLastMonth,
  padDateDigitsWithZero,
} from "@/commons/utils/dates";
import {
  Filters,
  FilterType,
  OptionType,
  SelectFilterType,
  useFilters,
} from "in-ui-react";
import { ReactElement, useMemo } from "react";
import { TotalDistributionsByType } from "../../components/data-display/TotalDistributionsByType";
import { ValuationsByAsset } from "../../components/data-display/ValuationsByAsset";

const defaultFilters = {
  actual_period: {
    from_date: padDateDigitsWithZero(getFirstDateOfYear()),
    to_date: padDateDigitsWithZero(getLastDayOfLastMonth()),
  },
  fund_name: "Industrial Fund Example",
  status: "active",
};

const PortfolioInvestingPerformance: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters(defaultFilters);

  const { data: filters, isLoading: isLoadingFilters } = useAssetsFilters();

  const apiFilters: FilterType[] = useMemo(() => {
    const availableFilters = ["fund", "status"];
    const filterRemap = {
      fund: "fund_name",
    };
    const memoFilters =
      filters
        ?.filter((filter) => availableFilters.includes(filter?.key))
        ?.map(
          (filter) =>
            ({
              ...filter,
              key: filterRemap[filter.key] || filter.key,
              name: filter.name,
              unDeletable: true,
              type: "simple-select",
            } as SelectFilterType)
        ) || [];

    return memoFilters;
  }, [filters]);

  const memoFilters: FilterType<OptionType>[] = useMemo(() => {
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
      ...apiFilters,
    ];
  }, [apiFilters]);

  return (
    <>
      <Filters
        className="mb-3"
        filters={memoFilters}
        filteredOptions={filteredOptions}
        onApply={(filters) => onApply(filters)}
        isLoading={isLoadingFilters}
        autoInitialFocus={false}
        onClear={() => {
          onApply(defaultFilters);
        }}
        hideAddButton
      />
      <section className="commons-grid">
        <ValuationsByAsset
          className="commons-grid-span-full"
          filters={{
            fund_name: filteredOptions.fund_name,
            status: filteredOptions.status,
          }}
        />
        <TotalDistributionsByType
          className="commons-grid-span-full"
          filters={{
            investment_fund_name: filteredOptions.fund_name,
            ...filteredOptions,
          }}
        />
        <DistributionAndContributionKPIs
          className="commons-grid-span-4"
          filters={{
            investment_fund_name: filteredOptions.fund_name,
            ...filteredOptions,
          }}
          useQuery={useDistributionsContributionsKPIs}
        />
        <NetContributionsAndDistributions
          className="commons-grid-span-8"
          filters={{
            investment_fund_name: filteredOptions.fund_name,
            ...filteredOptions,
          }}
          useQuery={usePropertyNetContributionDistributionChart}
        />
        <TotalDistributionsBudgetVsActual
          className="commons-grid-span-full"
          filters={{
            fund_name: filteredOptions.fund_name,
            investment_fund_name: filteredOptions.fund_name,
            ...filteredOptions,
          }}
          useActualQuery={useTotalDistributionActualLineChart}
          useBudgetQuery={useTotalDistributionBudgetLineChart}
        />
      </section>
    </>
  );
};

PortfolioInvestingPerformance.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund - Investing Performance" />
      <PortfolioLayout title="Investing Performance">{page}</PortfolioLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PortfolioInvestingPerformance;
