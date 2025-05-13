import { GeneralDebtFilters } from "@/commons/components/data-entry/GeneralDebtFilters";
import { NextPageWithLayout } from "@/commons/typings";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import {
  useFundKpis,
  useFundLendersLegacy,
  useFundMaturityLenders,
} from "@/debt/services/queries/fund";
import { Loader, useFilters } from "in-ui-react";
import dynamic from "next/dynamic";
import { OutstandingBalanceByLender } from "./components/OutstandingBalanceByLender";
import { LoanMaturitySchedule } from "./components/LoanMaturitySchedule";
import { SummaryKpis } from "./components/SummaryKpis";
import "./styles.css";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const ChartsLegends = dynamic(
  () => import("@/commons/pages/PortfolioSummary/components/ChartsLegends"),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-96">
        <Loader3D
          kind="chart"
          style={{
            minHeight: 350,
          }}
          isLoading
          localIsLoading
          onChangeIsLoading={() => null}
        />
      </div>
    ),
  }
);

const PortfolioSummary: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters(
    defaultFundStatusFilteredOptions
  );

  /* All these query hooks points to inDebt module services folder /src/modules/debt/services */

  const {
    data: fundKpis,
    isLoading: isLoadingFundKpis,
    isRefetching: isRefetchingFundKpis,
  } = useFundKpis(filteredOptions);

  const {
    data: balanceByLender,
    isLoading: isLoadingLenders,
    isRefetching: isRefetchingLenders,
  } = useFundLendersLegacy(filteredOptions);

  const {
    data: loanMaturitySchedule,
    isLoading: isLoadingMaturityLenders,
    isRefetching: isRefetchingMaturityLenders,
  } = useFundMaturityLenders(filteredOptions);

  const lenders = balanceByLender?.map((item) => item.lender);

  return (
    <div className="debt-portfolio-summary-page__grid">
      <GeneralDebtFilters
        className="debt-portfolio-summary-page__grid-full"
        filteredOptions={filteredOptions}
        onApply={onApply}
      />
      <SummaryKpis
        kpis={fundKpis}
        isLoading={isLoadingFundKpis || isRefetchingFundKpis}
        className="debt-portfolio-summary-page__grid-span-4"
      />
      <OutstandingBalanceByLender
        data={balanceByLender}
        isLoading={isLoadingLenders || isRefetchingLenders}
        className="debt-portfolio-summary-page__grid-span-4"
      />
      <LoanMaturitySchedule
        data={loanMaturitySchedule}
        lenders={lenders}
        isLoading={isLoadingMaturityLenders || isRefetchingMaturityLenders}
        className="debt-portfolio-summary-page__grid-span-8"
      />
      <ChartsLegends
        legends={lenders}
        isLoading={isLoadingLenders || isRefetchingLenders}
        className="debt-portfolio-summary-page__grid-full"
      />
    </div>
  );
};

export default PortfolioSummary;
