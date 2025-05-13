import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import {
  ArrowDownTrayIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { AsElement, Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import { InvestorNavbar } from "../components/layout/InvestorNavbar";
import "./styles.css";

export const InvestorLayout: FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const headerClasses = `header-page-animation`;

  const homeRoutes = [
    {
      href: "/investor/",
      label: "Presentations",
      icon: <PresentationChartBarIcon />,
      outlineIcon: <PresentationChartBarIcon />,
      description: null,
      as: "a" as AsElement,
    },
    {
      href: "/investor/report/",
      label: "Generate Report",
      icon: <ArrowDownTrayIcon />,
      outlineIcon: <ArrowDownTrayIcon />,
      description: null,
      as: "a" as AsElement,
    },
  ];

  return (
    <>
      <InvestorNavbar />
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
        <div className="investor-main-layout__container">
          <Heading
            data-cy="investor-main-heading"
            className="investor-main-layout__heading"
          >
            {title}
          </Heading>
        </div>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
