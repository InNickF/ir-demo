import { usePagination } from "@/commons/hooks/usePagination";
import { GenericFilterPayload, NextPageWithLayout } from "@/commons/typings";
import { defaultPaginatedData } from "@/commons/utils";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { Button, useFilters } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, ReactElement, useState } from "react";
import { DebtHead } from "../../components/general/DebtHead";
import { DebtLoanSummaryLayout } from "../../layouts/DebtLoanSummaryLayout";
import { InDebtPermissionsLayout } from "../../layouts/InDebtPermissionsLayout";
import {
  useMutateDeleteLoanRoomItem,
  useMutatePatchLoanRoomItem,
  useMutatePostLoanRoomItem,
} from "../../services/mutations/loans";
import { useDebtLoanRoom } from "../../services/queries/loans";
import { DebtLoanRoomItem } from "../../typings/loans";
import { LoanRoomCard } from "./components/LoanRoomCard";
import { LoanRoomModal } from "./components/LoanRoomModal";
import { CreateFileForm } from "./components/LoanRoomModal/forms/CreateFile";
import { DeleteFileForm } from "./components/LoanRoomModal/forms/DeleteFile";
import { EditFileForm } from "./components/LoanRoomModal/forms/EditFile";
import { useLoanRoomModal } from "./components/LoanRoomModal/hooks/useLoanRoomModal";
import { GenericLoanRoomUseMutation } from "./components/LoanRoomModal/types";
import { LoanRoomTable } from "./components/LoanRoomTable";
import { LoanRoomTableActions } from "./components/LoanRoomTableActions";
import "./styles.css";

interface LoanRoomTableWithDataProps {
  filters: GenericFilterPayload;
  onEdit: (item: DebtLoanRoomItem) => void;
  onDelete: (item: DebtLoanRoomItem) => void;
}

const LoanRoomTableWithData: FC<LoanRoomTableWithDataProps> = ({
  filters,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();
  const { loanId } = router.query;

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const {
    data = defaultPaginatedData,
    isLoading,
    isRefetching,
  } = useDebtLoanRoom({
    loan_abstract_id: loanId,
    page: page.toString(),
    ordering: ordering,
    ...filters,
  });

  return (
    <LoanRoomCard
      icon={<ClipboardDocumentIcon />}
      title="Loan Room"
      isLoading={isLoading}
      isRefetching={isRefetching}
    >
      <LoanRoomTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        data={data.results}
        page={page}
        setPage={setPage}
        ordering={ordering}
        tableActions={(item: DebtLoanRoomItem) => (
          <LoanRoomTableActions
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        )}
        setOrdering={setOrdering}
      />
    </LoanRoomCard>
  );
};

const LoanRoom: NextPageWithLayout = () => {
  const { filteredOptions } = useFilters();

  const { state, createFile, editFile, deleteFile, resetModalState } =
    useLoanRoomModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onCreate = () =>
    createFile({
      Form: CreateFileForm,
      useMutation: useMutatePostLoanRoomItem as GenericLoanRoomUseMutation,
      ...modalActions,
    });

  const onEdit = (item: DebtLoanRoomItem) => {
    editFile({
      item,
      Form: EditFileForm,
      useMutation: useMutatePatchLoanRoomItem as GenericLoanRoomUseMutation,
      ...modalActions,
    });
  };

  const onDelete = (item: DebtLoanRoomItem) => {
    deleteFile({
      item,
      Form: DeleteFileForm,
      useMutation: useMutateDeleteLoanRoomItem as GenericLoanRoomUseMutation,
      ...modalActions,
    });
  };

  return (
    <>
      <section className="debt-loan-room-filters">
        <Button onClick={onCreate}>Add new file</Button>
        <LoanRoomModal {...state} onCancel={() => resetModalState()} />
      </section>

      <LoanRoomTableWithData
        filters={filteredOptions}
        onEdit={(item) => onEdit(item)}
        onDelete={(item) => onDelete(item)}
      />
    </>
  );
};

LoanRoom.getLayout = (page: ReactElement) => {
  return (
    <InDebtPermissionsLayout>
      <DebtHead title="Loan Room" />
      <DebtLoanSummaryLayout>{page}</DebtLoanSummaryLayout>
    </InDebtPermissionsLayout>
  );
};

export default LoanRoom;
