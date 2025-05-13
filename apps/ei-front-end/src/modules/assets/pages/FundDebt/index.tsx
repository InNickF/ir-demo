import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { getFundsURL } from "@/assets/utils/redirects/funds-redirects";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { DebtOverview } from "@/commons/pages/DebtOverview";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";

const FundDebt: NextPageWithLayout = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  return (
    <DebtOverview
      fund={fundId}
      disabledFilterKeys={["fund", "property", "lender"]}
    />
  );
};

FundDebt.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Debt" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundDebt;
