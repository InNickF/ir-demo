import { HeaderTitle } from "@/commons/components/data-display/HeaderTitle";
import { useDeal } from "@/acquisitions/services/queries/deals";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { AcqNavbar } from "@/modules/acquisitions/components/layout/AcqNavbar";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  MapIcon,
  PencilIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { PageHeader } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useState } from "react";
import { DealDetails } from "./components/DealDetails";
import { DealKPIsSection } from "./components/DealKPIsSection";
import "./styles.css";

export const DealLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const isCompsFinderPage = router.pathname.includes("comps-finder");
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));
  const { dealId } = router.query;
  const { data: deal, isLoading } = useDeal({
    dealId: dealId as string,
    onError(error) {
      if (error?.response?.status === 404) {
        router.push("/acquisitions/deals");
      }
    },
  });

  const UNDERWRITING_TAB_LABEL = "Underwriting";

  const homeRoutes = [
    {
      href: `/acquisitions/deals/deal-summary/`,
      label: "Summary",
      icon: <DocumentTextIcon />,
    },
    {
      href: `/acquisitions/deals/underwriting/`,
      label: UNDERWRITING_TAB_LABEL,
      icon: <BanknotesIcon />,
    },
    {
      href: `/acquisitions/deals/market-analytics/`,
      label: "Market Analytics",
      icon: <PresentationChartLineIcon />,
    },
    {
      href: `/acquisitions/deals/comps-finder/`,
      label: "Comps Finder",
      icon: <MapIcon />,
    },
    {
      href: `/acquisitions/deals/deal-room/`,
      label: "Deal Room",
      icon: <ClipboardDocumentCheckIcon />,
    },
    {
      href: `/acquisitions/deals/edit/`,
      label: "Edit Deal Information",
      icon: <PencilIcon />,
    },
  ]
    .map((item) => ({
      ...item,
      href: `${item.href}?dealId=${dealId}`,
    }))
    .filter((item) => {
      return item.label !== UNDERWRITING_TAB_LABEL;
    });

  const headerClassName = `header-page-animation ${
    isCompsFinderPage ? "acq-deals-header--comps-finder" : ""
  }`;

  return (
    <>
      <AcqNavbar />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu items={homeRoutes} />}
        className={headerClassName}
        data-header="comps-finder"
      >
        <HeaderGrid>
          <div className="acq-header-deal-info">
            <HeaderTitle small={isCompsFinderPage} isLoading={isLoading}>
              {genericGetValue(deal?.name)}
            </HeaderTitle>
            <DealDetails isLoading={isLoading}>
              <small>Address: {genericGetValue(deal?.address)}</small>
            </DealDetails>
          </div>
          <DealKPIsSection deal={deal} isLoading={isLoading} />
        </HeaderGrid>
      </PageHeader>
      {isCompsFinderPage ? children : <PageContainer>{children}</PageContainer>}
    </>
  );
};
