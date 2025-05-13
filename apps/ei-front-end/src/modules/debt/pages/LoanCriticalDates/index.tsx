import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { usePagination } from "@/commons/hooks/usePagination";
import { NextPageWithLayout } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { DebtHead } from "../../components/general/DebtHead";
import { DebtLoanSummaryLayout } from "../../layouts/DebtLoanSummaryLayout";
import { InDebtPermissionsLayout } from "../../layouts/InDebtPermissionsLayout";
import {
  useMutateDeleteDebtLoanTimeline,
  useMutatePatchDebtLoanTimeline,
  useMutatePostDebtLoanTimeline,
} from "../../services/mutations/loans";
import { useDebtLoanTimeline } from "../../services/queries/loans";
import { DebtLoanTimeline } from "../../typings/loans";
import { LoanTimelineModal } from "./components/LoanTimelineModal";
import { CreateLoanTimelineForm } from "./components/LoanTimelineModal/forms/CreateLoanTimelineForm";
import { DeleteLoanTimelineForm } from "./components/LoanTimelineModal/forms/DeleteLoanTimelineForm";
import { EditLoanTimelineForm } from "./components/LoanTimelineModal/forms/EditLoanTimelineForm";
import { useLoanTimelineModal } from "./components/LoanTimelineModal/hooks/useLoanTimelineModal";
import { GenericLoanTimelineUseMutation } from "./components/LoanTimelineModal/types";
import { LoanTimelineTable } from "./components/LoanTimelineTable";
import { LoanTimelineTableActions } from "./components/LoanTimelineTableActions";
import "./styles.css";

const LoanCriticalDates: NextPageWithLayout = () => {
  const prefix = "debt-loan-timeline";

  const router = useRouter();
  const { loanId } = router.query;

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
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
      ...modalActions,
    });
  };

  return (
    <>
      <section className={`${prefix}-actions-section`}>
        <Button onClick={onCreate}>Add New Critical Date</Button>
      </section>
      <CardWithHeader
        title="Loan Critical Dates"
        icon={<CalendarIcon />}
        bodyPadding={false}
        isLoading={isLoading}
        isRefetching={isRefetching}
        className={`${prefix}-table-card`}
        loaderKind="chart"
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

LoanCriticalDates.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Critical Dates" />
      <DebtLoanSummaryLayout>{page}</DebtLoanSummaryLayout>
    </InDebtPermissionsLayout>
  );
};

export default LoanCriticalDates;
