import { AssetsNavbar } from "@/assets/components/layout/AssetsNavbar";
import { HeaderTitle } from "@/commons/components/data-display/HeaderTitle";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { AsElement, LoadingLine, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import { useGetFund, useGetFunds } from "../services/queries/funds";
import { getFundsURL } from "../utils/redirects/funds-redirects";
import { IdSwitcher } from "@/commons/components/data-display/IdSwitcher";
import { fundFormatter } from "../entities/fund/formatters";

export const FundLayout: FC<PropsWithChildren> = ({ children }) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const { data: funds = [], isLoading: isLoadingFunds } = useGetFunds({
    filters: null,
  });

  const routes = getFundsURL({
    id: fundId,
  }).routes?.map((route) => ({
    ...route,
    as: "a" as AsElement,
  }));

  const { data, isLoading, isRefetching } = useGetFund({
    filters: { fund: fundId },
  });

  return (
    <>
      <AssetsNavbar />
      <LoadingLine isActive={isRefetching} persist />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu items={routes} />}
        className="header-page-animation"
      >
        <HeaderGrid>
          <HeaderTitle isLoading={isLoading}>
            <div className="flex gap-2 items-center">
              {genericGetValue(data?.fund_name, true)}
              <IdSwitcher
                modelName="Fund"
                items={funds}
                nameAccessor="fund_name"
                idAccessor="fund_name"
                activeElementId={fundId}
                isLoading={isLoadingFunds}
                formatter={fundFormatter.value}
                keyDetails={[
                  { key: "current_nav", label: "NAV" },
                  { key: "current_gav", label: "GAV" },
                  { key: "projected_exit_irr", label: "Projected IRR" },
                  { key: "projected_exit_gross_moc", label: "Projected MoC" },
                ]}
              />
            </div>
          </HeaderTitle>
        </HeaderGrid>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
