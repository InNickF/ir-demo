import { HeaderTitle } from "@/commons/components/data-display/HeaderTitle";
import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { PageContainer } from "@/commons/components/layout/PageContainer";
import { PageHeaderMenu } from "@/commons/components/layout/PageHeaderMenu";
import { useOnChangeRoute } from "@/commons/hooks/useOnchangeRoute";
import {
  CalendarIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { PageHeader } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useState } from "react";
import { DebtNavbar } from "../../components/layout/DebtNavbar";
import { useDebtLoanSummary } from "../../services/queries/loans";
import { LoanDetails } from "./components/LoanDetails";
import { LoanKPIsSection } from "./components/LoanKPIsSection";

export const DebtLoanSummaryLayout: FC<PropsWithChildren> = ({ children }) => {
  const [headerDrawer, setHeaderDrawer] = useState(false);

  const router = useRouter();
  const { loanId } = router.query;

  const { data: loan, isLoading } = useDebtLoanSummary({
    id: loanId as string,
  });

  useOnChangeRoute(() => setHeaderDrawer(false));

  const headerClasses = `acq-funds-overview-header header-page-animation`;

  const loanSummaryRoutes = [
    {
      href: `/debt/loans/loan-summary/`,
      label: "Summary",
      icon: <DocumentTextIcon />,
    },
    {
      href: `/debt/loans/covenant-testing/`,
      label: "Covenant Testing",
      icon: <PresentationChartBarIcon />,
    },
    {
      href: `/debt/loans/reporting/`,
      label: "Reporting",
      icon: <ClipboardDocumentListIcon />,
    },
    {
      href: `/debt/loans/critical-dates/`,
      label: "Critical Dates",
      icon: <CalendarIcon />,
    },
    {
      href: `/debt/loans/loan-room/`,
      label: "Loan Room",
      icon: <ClipboardDocumentIcon />,
    },
  ].map((item) => ({
    ...item,
    href: `${item.href}?loanId=${loanId}`,
  }));

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
        menu={<PageHeaderMenu items={loanSummaryRoutes} />}
        className={headerClasses}
      >
        <HeaderGrid>
          <div>
            <HeaderTitle isLoading={isLoading}>{loan?.loan_name}</HeaderTitle>
            <LoanDetails isLoading={isLoading} />
          </div>
          <LoanKPIsSection loan={loan} isLoading={isLoading} />
        </HeaderGrid>
      </PageHeader>
      <PageContainer>{children}</PageContainer>
    </>
  );
};
