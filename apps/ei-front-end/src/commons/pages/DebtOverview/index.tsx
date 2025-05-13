import { GeneralDebtFilters } from "@/commons/components/data-entry/GeneralDebtFilters";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import { LoanExpirationsChart } from "@/modules/assets/components/data-display/charts/LoanExpirationsChart";
import { DebtInformation } from "@/modules/assets/components/data-display/DebtInformation";
import { DebtLoansTimeline } from "@/modules/debt/pages/Overview/components/OverviewTimeline";
import { useFundOutstandingBalanceByLenders } from "@/modules/debt/services/queries/fund";
import { Loader, useFilters } from "in-ui-react";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import { OutstandingBalanceByLender } from "../PortfolioSummary/components/OutstandingBalanceByLender";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const ChartsLegends = dynamic(
  () => import("@/commons/pages/PortfolioSummary/components/ChartsLegends"),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-12">
        <Loader />
      </div>
    ),
  }
);

export interface DebtOverviewProps {
  fund?: string;
  disabledFilterKeys?: string[];
}

export const DebtOverview: FC<DebtOverviewProps> = ({
  fund,
  disabledFilterKeys,
}) => {
  const { filteredOptions, onApply } = useFilters({
    ...defaultFundStatusFilteredOptions,
  });

  const computedFilters = useMemo(() => {
    return fund
      ? {
          ...filteredOptions,
          fund,
        }
      : filteredOptions;
  }, [filteredOptions, fund]);

  const {
    data: balanceByLender,
    isLoading: isLoadingLenders,
    isRefetching: isRefetchingLenders,
  } = useFundOutstandingBalanceByLenders(defaultFundStatusFilteredOptions);

  const lenders = useMemo(() => {
    return balanceByLender?.map((item) => item.lender);
  }, [balanceByLender]);

  return (
    <div className="commons-grid">
      <GeneralDebtFilters
        className="commons-grid-span-full"
        filteredOptions={computedFilters}
        onApply={onApply}
        disabledKeys={disabledFilterKeys}
      />
      <DebtInformation
        className="col-auto lg:col-span-7"
        filteredOptions={defaultFundStatusFilteredOptions}
      />
      <DebtLoansTimeline
        className="col-auto lg:col-span-5"
        filters={{
          fund: defaultFundStatusFilteredOptions?.fund,
        }}
      />
      <OutstandingBalanceByLender
        data={balanceByLender}
        isLoading={isLoadingLenders || isRefetchingLenders}
        className="commons-grid-span-4"
      />
      <LoanExpirationsChart
        lenders={lenders}
        filters={defaultFundStatusFilteredOptions}
        className="commons-grid-span-8"
      />
      <ChartsLegends
        legends={lenders}
        isLoading={isLoadingLenders || isRefetchingLenders}
        className="commons-grid-span-full"
      />
    </div>
  );
};
