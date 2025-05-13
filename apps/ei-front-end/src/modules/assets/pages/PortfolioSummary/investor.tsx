import { PortfolioLayout } from "@/modules/assets/layouts/PortfolioLayout";
import { WithAuthLayout } from "@/commons/layouts/WithUserLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";
import { AssetHead } from "../../components/general/AssetHead";
import { LeaseExpirationsChart } from "../../components/data-display/charts/LeaseExpirationsChart";

const InvestorPortfolioPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="h-96">
        <LeaseExpirationsChart fundFilter="Fund V" />
      </div>
    </>
  );
};

InvestorPortfolioPage.getLayout = (page: ReactElement) => {
  return (
    <WithAuthLayout>
      <AssetHead title="Investor Portfolio" />
      <PortfolioLayout title="Investor Portfolio">{page}</PortfolioLayout>
    </WithAuthLayout>
  );
};

export default InvestorPortfolioPage;
