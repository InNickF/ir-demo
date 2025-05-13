import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { AssetManagementOpportunitiesChart } from "@/modules/assets/components/data-display/charts/AssetManagementOpportunitiesChart";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { Title } from "in-ui-react";

export const AssetManagementSection = () => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  return (
    <>
      <div className="portfolio-growth-page__grid-full">
        <Title kind="h2">Active Asset Management</Title>
      </div>
      <AssetManagementOpportunitiesChart
        fund={fundId}
        className="portfolio-growth-page__grid-full"
      />
    </>
  );
};
