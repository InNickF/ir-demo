import { NextPageWithLayout } from "@/commons/typings";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { SearchLoanMetricInput } from "../../components/data-entry/SearchLoanMetricInput";
import { DebtHead } from "../../components/general/DebtHead";
import { DebtLoanSummaryLayout } from "../../layouts/DebtLoanSummaryLayout";
import { InDebtPermissionsLayout } from "../../layouts/InDebtPermissionsLayout";
import { useDebtLoanSummary } from "../../services/queries/loans";
import { LoanSummaryCard } from "./components/LoanSummaryCard";
import { loanSummaryKeysFullWidth } from "./utils";
import { LoanSummaryCriticalDatesTable } from "./components/LoanSummaryCriticalDatesTable";

const LoanSummaryPage: NextPageWithLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { loanId } = router.query;

  const { data: loanSummary } = useDebtLoanSummary({
    id: loanId as string,
  });

  return (
    <>
      <SearchLoanMetricInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        rightIconAction={() => setSearchQuery("")}
      />
      <div className="mt-4 commons-grid">
        {loanSummary?.detail?.map((metrics) => {
          const getTableClasses = () => {
            const classes = [];
            loanSummaryKeysFullWidth?.includes(metrics?.key)
              ? classes.push("commons-grid-span-full")
              : classes.push("commons-grid-span-6");
            return classes.join(" ");
          };

          return (
            <LoanSummaryCard
              key={metrics.key}
              metrics={metrics}
              searchQuery={searchQuery}
              className={getTableClasses()}
            />
          );
        })}
      </div>
      <LoanSummaryCriticalDatesTable />
    </>
  );
};

LoanSummaryPage.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Loan Summary" />
      <DebtLoanSummaryLayout>{page}</DebtLoanSummaryLayout>
    </InDebtPermissionsLayout>
  );
};

export default LoanSummaryPage;
