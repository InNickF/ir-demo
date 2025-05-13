import { NextPageWithLayout } from "@/commons/typings";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { SearchLoanMetricInput } from "../../components/data-entry/SearchLoanMetricInput";
import { DebtHead } from "../../components/general/DebtHead";
import { DebtLoanSummaryLayout } from "../../layouts/DebtLoanSummaryLayout";
import { InDebtPermissionsLayout } from "../../layouts/InDebtPermissionsLayout";
import { useDebtLoanReporting } from "../../services/queries/loans";
import { LoanReportingCard } from "./components/LoanReportingCard";

const LoanReporting: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { loanId } = router.query;

  const { data: { detail: loanDetail } = {} } = useDebtLoanReporting({
    id: loanId as string,
  });

  return (
    <>
      <SearchLoanMetricInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        rightIconAction={() => setSearchQuery("")}
      />
      {loanDetail?.map((metrics) => {
        return (
          <LoanReportingCard
            key={metrics?.key}
            metrics={metrics}
            searchQuery={searchQuery}
          />
        );
      })}
    </>
  );
};

LoanReporting.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Reporting" />
      <DebtLoanSummaryLayout>{page}</DebtLoanSummaryLayout>
    </InDebtPermissionsLayout>
  );
};

export default LoanReporting;
