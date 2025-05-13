import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import { Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren, useState } from "react";
import { DebtNavbar } from "../../components/layout/DebtNavbar";
import "./styles.css";

export const DebtLoansLayout: FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);
  useOnChangeRoute(() => setHeaderDrawer(false));

  const headerClasses = `debt-loans-table-header header-page-animation`;

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
        data-header="loans-table-page"
      >
        <div className="debt-loans-layout__container">
          <Heading
            data-cy="debt-loans-heading"
            className="debt-loans-layout__heading"
            kind="h2"
          >
            {title}
          </Heading>
        </div>
      </PageHeader>
      {children}
    </>
  );
};
