import { AssetsNavbar } from "@/assets/components/layout/AssetsNavbar";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import {
  ArrowTrendingUpIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon,
  BoltIcon,
  PresentationChartBarIcon,
  VariableIcon,
} from "@heroicons/react/24/outline";
import { AsElement, Heading, HeadingKind, PageHeader } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useState } from "react";

interface PortfolioLayoutProps {
  title: string;
  headerSize?: HeadingKind["kind"];
}

export const PortfolioLayout: FC<PropsWithChildren & PortfolioLayoutProps> = ({
  children,
  title,
  headerSize = "display",
}) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const router = useRouter();
  const isPipelinePage = router.pathname.includes("pipeline");

  const homeRoutes = [
    {
      href: "/assets/",
      label: "Portfolio Summary",
      icon: <ArrowsRightLeftIcon />,
      as: "a" as AsElement,
    },
    {
      href: "/assets/debt/portfolio-summary/",
      label: "Debt",
      icon: <BanknotesIcon />,
      as: "a" as AsElement,
    },
    {
      href: "/assets/portfolio/growth/",
      label: "Growth",
      icon: <ArrowTrendingUpIcon />,
      as: "a" as AsElement,
    },
    {
      href: "/assets/portfolio/operational-financial-performance/",
      label: "Operational Financial Performance",
      icon: <VariableIcon />,
      as: "a" as AsElement,
    },
    {
      href: "/assets/portfolio/investing-performance/",
      label: "Investing Performance",
      icon: <BoltIcon />,
      as: "a" as AsElement,
    },
    {
      href: "/assets/debt/risk-refi/",
      label: "Risk/Refi",
      icon: <PresentationChartBarIcon />,
      description: null,
      as: "a" as AsElement,
    },
  ];

  const headerClasses = `acq-funds-overview-header header-page-animation`;

  return (
    <>
      <AssetsNavbar />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu items={homeRoutes} />}
        className={headerClasses}
      >
        <HeaderGrid>
          <Heading
            kind={headerSize}
            data-cy="fund-overview-heading"
            className={isPipelinePage ? "text-6xl 3xl:text-7xl" : undefined}
          >
            {title}
          </Heading>
        </HeaderGrid>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
