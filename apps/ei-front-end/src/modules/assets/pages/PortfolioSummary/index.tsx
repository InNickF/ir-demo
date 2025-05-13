import { AssetHead } from "@/assets/components/general/AssetHead";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { GeneralAssetsFilters } from "@/commons/components/data-entry/GeneralAssetsFilters";
import { NextPageWithLayout } from "@/commons/typings";
import { defaultFundStatusFilteredOptions } from "@/commons/utils/filters";
import { PortfolioLayout } from "@/modules/assets/layouts/PortfolioLayout";
import { useFilters } from "in-ui-react";
import { isEqual } from "lodash";
import { ReactElement, useState } from "react";
import { FundARChart } from "../../components/data-display/charts/ARChart";
import { GAVBreakdownChart } from "../../components/data-display/charts/GAVBreakdownChart";
import { LeaseExpirationsChart } from "../../components/data-display/charts/LeaseExpirationsChart";
import { LoanExpirationsChart } from "../../components/data-display/charts/LoanExpirationsChart";
import { PropertyGeography } from "../../components/data-display/PropertyGeography";
import { PortfolioMetrics } from "./components/PortfolioMetrics";
import { ProjectedNOIGrowthChart } from "../../components/data-display/charts/ProjectedNOIGrowthChart";
import "./styles.css";

const PortfolioPage: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters(
    defaultFundStatusFilteredOptions
  );

  const [filterGav, setFilterGav] = useState(null);

  function getFilterGav(
    filteringKey: Record<string, string | boolean | string[]>
  ) {
    setFilterGav((value) => {
      return isEqual(value, filteringKey) ? null : filteringKey;
    });
  }

  return (
    <div className="asset-portfolio-page__grid">
      <div className="asset-portfolio-page__grid-full">
        <GeneralAssetsFilters
          filteredOptions={filteredOptions}
          onApply={onApply}
        />
      </div>
      <PortfolioMetrics
        filters={filteredOptions}
        className="asset-portfolio-page__grid-full"
      />
      <GAVBreakdownChart
        filters={filteredOptions}
        className="asset-portfolio-page__grid-span-4"
        onClick={getFilterGav}
      />
      <PropertyGeography
        filters={{ ...filteredOptions, ...filterGav }}
        className="asset-portfolio-page__grid-span-8"
      />
      <LeaseExpirationsChart
        filters={filteredOptions}
        className="asset-portfolio-page__grid-half"
      />
      <ProjectedNOIGrowthChart className="asset-portfolio-page__grid-half" />
      <FundARChart
        className="asset-portfolio-page__grid-half"
        filters={filteredOptions}
      />
      <LoanExpirationsChart
        filters={filteredOptions}
        className="asset-portfolio-page__grid-half"
      />
    </div>
  );
};

PortfolioPage.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Portfolio Summary" />
      <PortfolioLayout title="Portfolio Summary">{page}</PortfolioLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PortfolioPage;
