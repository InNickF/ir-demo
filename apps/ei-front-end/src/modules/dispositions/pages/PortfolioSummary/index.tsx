import { DispositionsHead } from "@/dispositions/components/general/DispositionsHead";
import { InDispositionsPermissionsLayout } from "@/dispositions/layouts/InDispositionsPermissionsLayout";
import { usePortfolioSummaryFilters } from "@/assets/services/queries/filters";
import { NextPageWithLayout } from "@/commons/typings";
import { PortfolioLayout } from "@/modules/dispositions/layouts/PortfolioLayout";
import { Filters, useFilters } from "in-ui-react";
import { isEqual } from "lodash";
import { ReactElement, useState } from "react";
import { GavPortfolioChart } from "./components/GavChart/";
import { LeasePortfolioChart } from "./components/LeasePortfolioChart";
import { LoanPortfolioChart } from "./components/LoanChart";
import { PropertyGeography } from "./components/PortfolioMap";
import { PortfolioMetrics } from "./components/PortfolioMetrics";
import { ProjectedNoiGrowth } from "./components/ProjectedNoiGrowth";
import "./styles.css";

const PortfolioPage: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters({
    fund: "Fund V",
  });

  const {
    data: portfolioSummaryFilters,
    isLoading: isPortfolioSummaryFilters,
  } = usePortfolioSummaryFilters();

  const [filterGav, setFilterGav] = useState({});

  function getFilterGav(
    filteringKey: Record<string, string | boolean | string[]>
  ) {
    setFilterGav((value) => {
      return isEqual(value, filteringKey) ? {} : filteringKey;
    });
  }

  return (
    <div className="dispositions-portfolio-page__grid">
      <div className="dispositions-portfolio-page__grid-full">
        <Filters
          filters={portfolioSummaryFilters || []}
          filteredOptions={filteredOptions}
          onApply={(filters) => onApply(filters)}
          kind="glass"
          isLoading={isPortfolioSummaryFilters}
        />
      </div>
      <PortfolioMetrics
        filters={filteredOptions}
        className="dispositions-portfolio-page__grid-full"
      />
      <GavPortfolioChart
        filters={filteredOptions}
        className="dispositions-portfolio-page__grid-span-4"
        onClick={getFilterGav}
      />

      <PropertyGeography
        filters={filterGav}
        className="dispositions-portfolio-page__grid-span-8"
      />

      <LeasePortfolioChart
        filters={filteredOptions}
        className="dispositions-portfolio-page__grid-half"
      />
      <ProjectedNoiGrowth className=" dispositions-portfolio-page__grid-half" />
      <LoanPortfolioChart
        filters={filteredOptions}
        className="dispositions-portfolio-page__grid-full"
      />
    </div>
  );
};

PortfolioPage.getLayout = (page: ReactElement) => {
  return (
    <InDispositionsPermissionsLayout>
      <DispositionsHead title="Portfolio Summary" />
      <PortfolioLayout title="Portfolio Summary">{page}</PortfolioLayout>
    </InDispositionsPermissionsLayout>
  );
};

export default PortfolioPage;
