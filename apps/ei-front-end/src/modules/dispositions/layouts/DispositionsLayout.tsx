import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { DispositionsNavbar } from "@/dispositions/components/layout/DispositionsNavbar";
import { EyeIcon } from "@heroicons/react/24/outline";
import { AsElement, Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";

interface DispositionsOverviewLayoutProps {
  title: string;
}

export const DispositionsOverviewLayout: FC<
  PropsWithChildren & DispositionsOverviewLayoutProps
> = ({ children, title }) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const homeRoutes = [
    {
      href: "/dispositions/property/",
      label: "Property Summary",
      icon: <EyeIcon />,
      outlineIcon: <EyeIcon />,
      description: null,
      as: "a" as AsElement,
    },

    /*     {
      href: "/assets/investor/",
      label: "Investor Summary",
      icon: <ArrowsRightLeftIcon />,
      outlineIcon: <ArrowsRightLeftIcon />,
      description: null,
      as: "a" as AsElement,
    }, */
  ];

  const headerClasses = `acq-funds-overview-header header-page-animation`;

  return (
    <>
      <DispositionsNavbar />
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
          <Heading data-cy="fund-overview-heading">{title}</Heading>
        </HeaderGrid>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
