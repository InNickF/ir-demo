import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { ToolsNavbar } from "@/tools/components/layout/ToolsNavbar";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { AsElement, Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import "./styles.css";

export const ToolsLayout: FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const headerClasses = `header-page-animation`;

  const homeRoutes = [];

  return (
    <>
      <ToolsNavbar />
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
        <div className="tools-main-layout__container">
          <Heading
            data-cy="tools-main-heading"
            className="tools-main-layout__heading"
          >
            {title}
          </Heading>
        </div>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
