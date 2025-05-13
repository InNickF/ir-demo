import { AssetHead } from "@/assets/components/general/AssetHead";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PortfolioLayout } from "@/assets/layouts/PortfolioLayout";
import DebtOverviewPage from "@/debt/pages/Overview";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";

const PortfolioDebtSummary: NextPageWithLayout = DebtOverviewPage;

PortfolioDebtSummary.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Portfolio Debt Summary" />
      <PortfolioLayout title="Portfolio Debt Summary">{page}</PortfolioLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PortfolioDebtSummary;
