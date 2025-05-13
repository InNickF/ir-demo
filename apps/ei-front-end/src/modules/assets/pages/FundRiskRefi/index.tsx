import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { getFundsURL } from "@/assets/utils/redirects/funds-redirects";
import { GeneralDebtFilters } from "@/commons/components/data-entry/GeneralDebtFilters";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { LenderCard } from "@/commons/pages/RiskRefi/components/LenderCard";
import { RiskRefiChartCard } from "@/commons/pages/RiskRefi/components/RiskRefiChartCard";
import { useRiskRefiFilters } from "@/commons/pages/RiskRefi/hooks/useRiskRefiFilter";
import { sortLendersBy } from "@/commons/pages/RiskRefi/utils";
import { NextPageWithLayout } from "@/commons/typings";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import { useFundLendersByLtv } from "@/modules/debt/services/queries/fund";
import { ButtonGroup, Skeleton, useFilters } from "in-ui-react";
import { ReactElement, useMemo } from "react";
import "./styles.css";

const FundRiskRefi: NextPageWithLayout = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  /* All these query hooks points to inDebt module services folder /src/modules/debt/services */

  const { filteredOptions, onApply } = useFilters({
    ...defaultFundStatusFilteredOptions,
    fund: fundId,
  });

  const computedFilters = useMemo(() => {
    return {
      ...filteredOptions,
      fund: fundId,
    };
  }, [filteredOptions, fundId]);

  const { riskRefiFilter, riskRefiItems } = useRiskRefiFilters();
  const {
    data: lendersByLtv,
    isLoading,
    isRefetching,
  } = useFundLendersByLtv(computedFilters);

  const sortingKey =
    riskRefiFilter === "risk"
      ? "debt_yield_over_last_12_months_noidm"
      : "calculated_interest_rate";
  const sortedLenders =
    !isLoading &&
    sortLendersBy({
      lenders: lendersByLtv,
      sortBy: sortingKey,
    });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <GeneralDebtFilters
          className="w-full"
          filteredOptions={computedFilters}
          onApply={onApply}
          disabledKeys={["fund", "property", "lender"]}
        />
        <ButtonGroup active={riskRefiFilter} items={riskRefiItems} />
      </div>
      <div className="debt-risk-refi-page__grid">
        <div className="debt-risk-refi-page__grid-span-2">
          <RiskRefiChartCard
            id="debt-risk-refi-chart"
            data={lendersByLtv}
            sortBy={riskRefiFilter}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
        </div>
        <div className="debt-risk-refi-page__grid-span-3">
          <div className="debt-risk-refi-page__lenders-container">
            {isLoading ? (
              <div className="w-full">
                <Skeleton>
                  <Skeleton.Avatar
                    shape="squared"
                    className="w-full h-[500px]"
                  />
                </Skeleton>
              </div>
            ) : (
              sortedLenders.map((lender) => (
                <LenderCard key={lender.loan_name} lender={lender} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FundRiskRefi.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Risk/Refi" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundRiskRefi;
