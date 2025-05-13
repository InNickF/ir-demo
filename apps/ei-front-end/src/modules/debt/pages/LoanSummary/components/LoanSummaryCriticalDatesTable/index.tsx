import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { usePagination } from "@/commons/hooks/usePagination";
import { defaultPaginatedData } from "@/commons/utils";
import {
  useMutateDeleteDebtLoanTimeline,
  useMutatePatchDebtLoanTimeline,
  useMutatePostDebtLoanTimeline,
} from "@/modules/debt/services/mutations/loans";
import { useDebtLoanTimeline } from "@/modules/debt/services/queries/loans";
import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { LoanTimelineModal } from "../../../LoanCriticalDates/components/LoanTimelineModal";
import { DeleteLoanTimelineForm } from "../../../LoanCriticalDates/components/LoanTimelineModal/forms/DeleteLoanTimelineForm";
import { EditLoanTimelineForm } from "../../../LoanCriticalDates/components/LoanTimelineModal/forms/EditLoanTimelineForm";
import { useLoanTimelineModal } from "../../../LoanCriticalDates/components/LoanTimelineModal/hooks/useLoanTimelineModal";
import { GenericLoanTimelineUseMutation } from "../../../LoanCriticalDates/components/LoanTimelineModal/types";
import { LoanTimelineTable } from "../../../LoanCriticalDates/components/LoanTimelineTable";
import { LoanTimelineTableActions } from "../../../LoanCriticalDates/components/LoanTimelineTableActions";
import { Button } from "in-ui-react";
import { CreateLoanTimelineForm } from "../../../LoanCriticalDates/components/LoanTimelineModal/forms/CreateLoanTimelineForm";

interface LoanSummaryCriticalDatesTableProps {
  className?: string;
}

export const LoanSummaryCriticalDatesTable: FC<
  LoanSummaryCriticalDatesTableProps
> = ({ className }) => {
  const router = useRouter();
  const { loanId } = router.query;
  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");

  const getClasses = () => {
    const classes = ["mt-4"];
    className && classes.push(className);
    return classes.join(" ");
  };

  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useDebtLoanTimeline({
    loan_abstract_id: loanId as string,
    page: page.toString(),
    ordering: ordering,
  });

  const { state, createFile, editFile, deleteFile, resetModalState } =
    useLoanTimelineModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onCreate = () =>
    createFile({
      Form: CreateLoanTimelineForm,
      useMutation:
        useMutatePostDebtLoanTimeline as GenericLoanTimelineUseMutation,
      ...modalActions,
    });

  const onEdit = (item: DebtLoanTimeline) => {
    editFile({
      item,
      Form: EditLoanTimelineForm,
      useMutation:
        useMutatePatchDebtLoanTimeline as GenericLoanTimelineUseMutation,
      ...modalActions,
    });
  };

  const onDelete = (item: DebtLoanTimeline) => {
    deleteFile({
      item,
      Form: DeleteLoanTimelineForm,
      useMutation:
        useMutateDeleteDebtLoanTimeline as GenericLoanTimelineUseMutation,
      actionText: "Delete",
      ...modalActions,
    });
  };

  return (
    <>
      <CardWithHeader
        title="Loan Critical Dates"
        icon={<CalendarIcon />}
        bodyPadding={false}
        isLoading={isLoading}
        isRefetching={isRefetching}
        className={getClasses()}
        loaderKind="chart"
        headerActions={
          <Button size="small" onClick={onCreate}>
            Add New Critical Date
          </Button>
        }
      >
        <LoanTimelineTable
          count={data.count}
          totalPages={data.total_pages}
          isLoading={isLoading}
          data={data.results}
          page={page}
          setPage={setPage}
          ordering={ordering}
          tableActions={(item: DebtLoanTimeline) => (
            <LoanTimelineTableActions
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item)}
            />
          )}
          setOrdering={setOrdering}
        />
      </CardWithHeader>
      <LoanTimelineModal {...state} onCancel={() => resetModalState()} />
    </>
  );
};
