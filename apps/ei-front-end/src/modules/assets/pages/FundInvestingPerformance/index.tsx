import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { FromToDateInputs } from "@/commons/components/data-entry/FromToDateInputs";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
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
import { DistributionAndContributionKPIs } from "../../components/data-display/investing-performance/DistributionAndContributionKPIs";
import { NetContributionsAndDistributions } from "../../components/data-display/investing-performance/NetContributionsAndDistributions";
import { TotalDistributionsBudgetVsActual } from "../../components/data-display/investing-performance/TotalDistributionsBudgetVsActual";
import { TotalDistributionsByType } from "../../components/data-display/TotalDistributionsByType";
import { ValuationsByAsset } from "../../components/data-display/ValuationsByAsset";
import { useAssetsFilters } from "../../services/queries/filters";
import {
  useDistributionsContributionsKPIs,
  usePropertyNetContributionDistributionChart,
  useTotalDistributionActualLineChart,
  useTotalDistributionBudgetLineChart,
} from "../../services/queries/investing-performance";
import { getFundsURL } from "../../utils/redirects/funds-redirects";

const defaultFilters = {
  actual_period: {
    from_date: "01/01/2025",
    to_date: "02/28/2025",
  },
  status: "active",
};

const FundInvestingPerformance: NextPageWithLayout = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const { filteredOptions, onApply } = useFilters(defaultFilters);

  const { data: filters, isLoading: isLoadingFilters } = useAssetsFilters();

  const apiFilters: FilterType[] = useMemo(() => {
    const availableFilters = ["status"];
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
            fund_name: fundId,
            status: "active",
          }}
        />
        <TotalDistributionsByType
          className="commons-grid-span-full"
          filters={{
            investment_fund_name: fundId,
            ...defaultFilters,
          }}
        />
        <DistributionAndContributionKPIs
          className="commons-grid-span-4"
          filters={{
            investment_fund_name: fundId,
            ...defaultFilters,
          }}
          useQuery={useDistributionsContributionsKPIs}
        />
        <NetContributionsAndDistributions
          className="commons-grid-span-8"
          filters={{
            investment_fund_name: fundId,
            ...defaultFilters,
          }}
          useQuery={usePropertyNetContributionDistributionChart}
        />
        <TotalDistributionsBudgetVsActual
          className="commons-grid-span-full"
          filters={{
            fund_name: fundId,
            investment_fund_name: fundId,
            ...defaultFilters,
          }}
          useActualQuery={useTotalDistributionActualLineChart}
          useBudgetQuery={useTotalDistributionBudgetLineChart}
        />
      </section>
    </>
  );
};

FundInvestingPerformance.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Investing Performance" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundInvestingPerformance;
