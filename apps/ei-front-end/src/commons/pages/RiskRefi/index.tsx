import { GeneralDebtFilters } from "@/commons/components/data-entry/GeneralDebtFilters";
import { NextPageWithLayout } from "@/commons/typings";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import { useFundLendersByLtv } from "@/debt/services/queries/fund";
import { ButtonGroup, Skeleton, useFilters } from "in-ui-react";
import { LenderCard } from "./components/LenderCard";
import { RiskRefiChartCard } from "./components/RiskRefiChartCard";
import { useRiskRefiFilters } from "./hooks/useRiskRefiFilter";
import "./styles.css";
import { sortLendersBy } from "./utils";

const RiskRefi: NextPageWithLayout = () => {
  /* All these query hooks points to inDebt module services folder /src/modules/debt/services */

  const { filteredOptions, onApply } = useFilters({
    ...defaultFundStatusFilteredOptions,
  });
  const { riskRefiFilter, riskRefiItems } = useRiskRefiFilters();
  const {
    data: lendersByLtv,
    isLoading,
    isRefetching,
  } = useFundLendersByLtv(defaultFundStatusFilteredOptions);

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
        <ButtonGroup active={riskRefiFilter} items={riskRefiItems} />
        <GeneralDebtFilters
          className="col-auto lg:col-span-12"
          filteredOptions={filteredOptions}
          onApply={onApply}
          disabledKeys={["property", "lender"]}
        />
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

export default RiskRefi;
