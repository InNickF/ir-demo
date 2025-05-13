import { MarketAnalyticsKPIs } from "@/acquisitions/components/data-display/MarketAnalyticsKPIs";
import { AcqNavbar } from "@/acquisitions/components/layout/AcqNavbar";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren } from "react";

export const MarketAnalyticsLayout: FC<PropsWithChildren> = ({ children }) => {
  const selectedMarket = { label: "South Florida", value: "South Florida" };

  return (
    <>
      <AcqNavbar />
      <PageHeader className="header-page-animation">
        <HeaderGrid>
          <div>
            <Heading>Market Analytics</Heading>
          </div>
          {selectedMarket?.value ? (
            <>
              <HeaderGrid.KPIsContainer>
                <MarketAnalyticsKPIs market={selectedMarket?.value} />
              </HeaderGrid.KPIsContainer>
            </>
          ) : null}
        </HeaderGrid>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
