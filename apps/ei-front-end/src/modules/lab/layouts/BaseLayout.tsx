import { Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import { LabNavBar } from "../components/layout/LabNavBar";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface BaseLayoutProps extends PropsWithChildren {
  title: string;
}
export const BaseLayout: FC<BaseLayoutProps> = ({ children, title }) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);

  const routes = [
    {
      href: `/lab/tree/`,
      label: "Tree",
      icon: <DocumentTextIcon />,
    },
    {
      href: `/lab/threejs/`,
      label: "threejs",
      icon: <DocumentTextIcon />,
    },
    {
      href: `/lab/models/`,
      label: "Models",
      icon: <DocumentTextIcon />,
    },
  ];

  return (
    <>
      <LabNavBar />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={<PageHeaderMenu items={routes} />}
      >
        <Heading>{title || "Lab"}</Heading>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
