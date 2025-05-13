import { DebtOverview } from "@/commons/pages/DebtOverview";
import { NextPageWithLayout } from "@/commons/typings";
import { DebtHead } from "@/debt/components/general/DebtHead";
import { DebtLayout } from "@/debt/layouts/DebtLayout";
import { InDebtPermissionsLayout } from "@/debt/layouts/InDebtPermissionsLayout";
import { ReactElement } from "react";

const DebtOverviewPage: NextPageWithLayout = () => {
  return <DebtOverview disabledFilterKeys={["property", "lender"]} />;
};

DebtOverviewPage.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Overview" />
      <DebtLayout title="Overview">{page}</DebtLayout>
    </InDebtPermissionsLayout>
  );
};

export default DebtOverviewPage;
