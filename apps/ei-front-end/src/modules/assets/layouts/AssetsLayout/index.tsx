import { AssetsNavbar } from "@/assets/components/layout/AssetsNavbar";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { Heading, PageHeader } from "in-ui-react";
import { FC, PropsWithChildren } from "react";
import "./styles.css";

interface AssetsLayoutProps extends PropsWithChildren {
  title: string;
}

export const AssetsLayout: FC<AssetsLayoutProps> = ({ children, title }) => {
  const headerClasses = `header-page-animation`;

  return (
    <>
      <AssetsNavbar />
      <PageHeader className={headerClasses}>
        <HeaderGrid>
          <Heading>{title}</Heading>
        </HeaderGrid>
      </PageHeader>
      {children}
    </>
  );
};
