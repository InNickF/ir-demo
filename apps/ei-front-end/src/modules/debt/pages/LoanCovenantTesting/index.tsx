import { NextPageWithLayout } from "@/commons/typings";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { SearchLoanMetricInput } from "../../components/data-entry/SearchLoanMetricInput";
import { DebtHead } from "../../components/general/DebtHead";
import { DebtLoanSummaryLayout } from "../../layouts/DebtLoanSummaryLayout";
import { InDebtPermissionsLayout } from "../../layouts/InDebtPermissionsLayout";
import { useDebtLoanCovenantTesting } from "../../services/queries/loans";
import { LoanCovenantTestingCard } from "./components/LoanCovenantTestingCard";

const LoanCovenantTestingPage: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { loanId } = router.query;

  const { data: { detail: loanDetail } = {} } = useDebtLoanCovenantTesting({
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
          <LoanCovenantTestingCard
            key={metrics?.key}
            metrics={metrics}
            searchQuery={searchQuery}
          />
        );
      })}
    </>
  );
};

LoanCovenantTestingPage.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Covenant Testing" />
      <DebtLoanSummaryLayout>{page}</DebtLoanSummaryLayout>
    </InDebtPermissionsLayout>
  );
};

export default LoanCovenantTestingPage;
