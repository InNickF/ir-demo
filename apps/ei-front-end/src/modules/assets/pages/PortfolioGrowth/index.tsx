import { AssetHead } from "@/assets/components/general/AssetHead";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PortfolioLayout } from "@/assets/layouts/PortfolioLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";
import { AssetManagementSection } from "./components/AssetManagementSection";
import { CurrentTenancySection } from "./components/CurrentTenancySection";
import "./styles.css";

const PortfolioGrowth: NextPageWithLayout = () => {
  return (
    <div className="portfolio-growth-page__grid">
      <CurrentTenancySection />
      <AssetManagementSection />
    </div>
  );
};

PortfolioGrowth.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Portfolio Growth" />
      <PortfolioLayout title="Portfolio Growth">{page}</PortfolioLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PortfolioGrowth;
