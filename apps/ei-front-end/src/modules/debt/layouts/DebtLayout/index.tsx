import { PageContainer } from "@/commons/components/layout/PageContainer";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import { DebtNavbar } from "../../components/layout/DebtNavbar";
import "./styles.css";

export const DebtLayout: FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const headerClasses = `acq-funds-overview-header header-page-animation`;

  return (
    <>
      <DebtNavbar />
      <PageHeader
        drawerIsOpen={headerDrawer}
        closeDrawer={() => {
          setHeaderDrawer(false);
        }}
        openDrawer={() => {
          setHeaderDrawer(true);
        }}
        menu={null}
        className={headerClasses}
      >
        <div className="debt-main-layout__container">
          <Heading data-cy="debt-main-heading">{title}</Heading>
        </div>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
