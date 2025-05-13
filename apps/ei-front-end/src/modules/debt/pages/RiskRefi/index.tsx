import RiskRefi from "@/commons/pages/RiskRefi";
import { NextPageWithLayout } from "@/commons/typings";
import { DebtHead } from "@/debt/components/general/DebtHead";
import { DebtLayout } from "@/debt/layouts/DebtLayout";
import { InDebtPermissionsLayout } from "@/debt/layouts/InDebtPermissionsLayout";
import { ReactElement } from "react";

const DebtRiskRefiPage: NextPageWithLayout = () => {
  return <RiskRefi />;
};

DebtRiskRefiPage.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Risk / Refi" />
      <DebtLayout title="Risk /Refi">{page}</DebtLayout>
    </InDebtPermissionsLayout>
  );
};

export default DebtRiskRefiPage;
