import { HeaderGrid } from "@/commons/components/layout/HeaderGrid";
import { HeaderKpi } from "@/commons/components/layout/HeaderKpi";
import { downloadFileFromURL } from "@/commons/services/api/downloadFileFromURL";
import { IsLoadingProp } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { LoanModal } from "@/modules/debt/components/general/LoanModal";
import { EditLoanAndLoanContractForm } from "@/modules/debt/components/general/LoanModal/components/forms/EditLoanAndLoanContractForm";
import { EditLoanContractForm } from "@/modules/debt/components/general/LoanModal/components/forms/EditLoanContractForm";
import { EditLoanForm } from "@/modules/debt/components/general/LoanModal/components/forms/EditLoanForm";
import { useLoanModal } from "@/modules/debt/components/general/LoanModal/hooks/useLoanModal";
import {
  DebtLoanContentKeys,
  DebtLoanSummary,
} from "@/modules/debt/typings/loans";
import { loanContentDetailFormatter } from "@/modules/debt/utils/formatters/loan-summary-formatters";
import { Button, Skeleton } from "in-ui-react";

export const LoanKPIsSection = ({
  loan,
  isLoading,
}: { loan: DebtLoanSummary } & IsLoadingProp) => {
  const { state, resetModalState, editLoan } = useLoanModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onEdit = () =>
    editLoan({
      header: `Edit Loan: ${loan?.borrower_name}`,
      item: {
        property: {
          label: loan?.lender_name,
          value: loan?.id,
        },
        loan_abstract_id: loan?.id,
        is_loan_active: loan?.is_loan_active,
        loan_name: loan?.loan_name,
      },
      Form: EditLoanAndLoanContractForm as typeof EditLoanForm,
      ...modalActions,
    });

  const handleContract = () => {
    if (loan?.contract_file) {
      downloadFileFromURL({
        url: loan?.contract_file,
        fileName: `${loan?.lender_name}__loan_contract__${loan.id}.pdf`,
        contentType: "application/pdf",
      });

      return;
    }

    editLoan({
      header: `Upload Loan Contract`,
      item: {
        property: {
          label: loan?.lender_name,
          value: loan?.id,
        },
        loan_abstract_id: loan?.id,
      },
      Form: EditLoanContractForm,
      ...modalActions,
    });
  };

  const DetailKPIs = () => {
    const KPIsKeys: Array<keyof DebtLoanContentKeys> = [
      "loan_amount_max_commitment",
      "current_outstanding_loan_balance",
      "initial_maturity_date",
    ];

    return (
      <>
        {KPIsKeys?.map((key) => {
          const value = loan && loan[key as keyof DebtLoanSummary];

          return (
            <HeaderKpi
              key={key}
              title={convertToTitleCase(key.replace(/_/g, " "))}
              value={
                loanContentDetailFormatter.format({
                  key,
                  value: value?.toString(),
                }).value
              }
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  };

  return isLoading ? (
    <Skeleton>
      <Skeleton.Text kind="title" className="h-20 xl:w-96" />
      <Skeleton.Text className="xl:w-full" />
    </Skeleton>
  ) : (
    <div>
      <HeaderGrid.KPIsContainer className="mb-4">
        <DetailKPIs />
      </HeaderGrid.KPIsContainer>
      <div className="flex gap-3">
        <Button block kind="solid" onClick={onEdit}>
          Edit Loan
        </Button>
        <LoanModal {...state} onCancel={() => resetModalState()} />
        <Button block kind="outline" disabled onClick={() => null}>
          {loan?.contract_file ? "Download Contract" : "Upload Contract"}
        </Button>
      </div>
    </div>
  );
};
