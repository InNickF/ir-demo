import { AssetHead } from "@/assets/components/general/AssetHead";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { PortfolioLayout } from "@/assets/layouts/PortfolioLayout";
import RiskRefi from "@/commons/pages/RiskRefi";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";

const DebtRiskRefi: NextPageWithLayout = () => {
  return <RiskRefi />;
};

DebtRiskRefi.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Risk/Refi" />
      <PortfolioLayout title="Risk/Refi">{page}</PortfolioLayout>
    </InAssetsPermissionsLayout>
  );
};

export default DebtRiskRefi;
