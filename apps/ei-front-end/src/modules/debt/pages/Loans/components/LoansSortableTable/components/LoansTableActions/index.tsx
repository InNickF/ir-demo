import { TableAction } from "@/commons/components/general/TableAction";
import { LoanModal } from "@/modules/debt/components/general/LoanModal";
import { EditLoanForm } from "@/modules/debt/components/general/LoanModal/components/forms/EditLoanForm";
import { useLoanModal } from "@/modules/debt/components/general/LoanModal/hooks/useLoanModal";
import { DebtLoan } from "@/modules/debt/typings/loans";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { FC } from "react";

interface LoansTableActionsProps {
  loan: DebtLoan;
}

export const LoansTableActions: FC<LoansTableActionsProps> = ({ loan }) => {
  const router = useRouter();
  const { state, resetModalState, editLoan } = useLoanModal();

  const onEdit = () =>
    editLoan({
      Form: EditLoanForm,
      onCancel: () => resetModalState(),
      onAction: () => resetModalState(),
    });

  return (
    <div className="flex">
      <TableAction
        tooltip="View"
        icon={<EyeIcon />}
        onClick={() => {
          router.push(`/debt/loans/loan-summary/?loanId=${loan?.id}`);
        }}
      />
      <TableAction tooltip="Edit" icon={<PencilIcon />} onClick={onEdit} />
      <LoanModal {...state} onCancel={() => resetModalState()} />
    </div>
  );
};
