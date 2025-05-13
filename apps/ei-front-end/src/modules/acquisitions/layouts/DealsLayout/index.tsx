import { FC, PropsWithChildren } from "react";
import { Button, Heading, PageHeader } from "in-ui-react";
import { AcqNavbar } from "@/modules/acquisitions/components/layout/AcqNavbar";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import "./styles.css";

interface DealsLayoutProps extends PropsWithChildren {
  title?: string;
  hasButton?: boolean;
  collapsed?: boolean;
}

export const DealsLayout: FC<DealsLayoutProps> = ({
  children,
  title,
  hasButton = false,
  collapsed = false,
}) => {
  const { pathname } = useRouter();
  const isDealsPage = pathname === "/acquisitions/deals";
  const getClasses = (): string => {
    const classes = ["header-page-animation"];
    collapsed && classes.push("acq-deals-page-header");
    return classes.join(" ");
  };
  return (
    <>
      <AcqNavbar />
      <PageHeader className={getClasses()} data-header="deals-table-page">
        <div className="flex items-center justify-between flex-wrap w-full gap-4">
          <Heading kind={collapsed ? "h2" : undefined}>{title}</Heading>
          {hasButton ? (
            <Link href="/acquisitions/deals/new-deal">
              <Button as="a">Add new deal</Button>
            </Link>
          ) : null}
        </div>
      </PageHeader>
      {isDealsPage ? children : <PageContainer>{children}</PageContainer>}
    </>
  );
};
