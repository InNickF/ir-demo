import { AssetsNavbar } from "@/assets/components/layout/AssetsNavbar";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren } from "react";
import "./styles.css";

interface FundsLayoutProps extends PropsWithChildren {
  title: string;
}

export const FundsLayout: FC<FundsLayoutProps> = ({ children, title }) => {
  const headerClasses = `header-page-animation`;

  return (
    <>
      <section className="assets-funds-layout">
        <AssetsNavbar />
        <PageHeader className={headerClasses}>
          <HeaderGrid>
            <Heading>{title}</Heading>
          </HeaderGrid>
        </PageHeader>
        {children}
      </section>
    </>
  );
};
