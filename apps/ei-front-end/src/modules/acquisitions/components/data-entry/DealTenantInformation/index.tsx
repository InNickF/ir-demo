import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { usePagination } from "@/commons/hooks/usePagination";
import { defaultPaginatedData } from "@/commons/utils";
import {
  useMutateDealTenantInformation,
  useMutateDeleteDealTenantInformation,
  useMutatePatchDealTenantInformation,
} from "@/modules/acquisitions/services/mutations/deals";
import { useDealTenantInformation } from "@/modules/acquisitions/services/queries/deals";
import { DealTenantInformation } from "@/modules/acquisitions/typings/deals";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { FC, useState } from "react";
import { DealTenantInformationModal } from "./components/DealTenantInformationModal";
import {
  CreateTenantInformationForm,
  DeleteTenantInformationForm,
  EditTenantInformationForm,
  ViewTenantInformationForm,
} from "./components/DealTenantInformationModal/forms";
import { useDealTenantInformationModal } from "./components/DealTenantInformationModal/hooks/useDealTenantInformationModal";
import { GenericDealTenantInformationUseMutation } from "./components/DealTenantInformationModal/types";
import { DealTenantInformationTable } from "./components/DealTenantInformationTable";
import { DealTenantInformationTableActions } from "./components/DealTenantInformationTableActions";
import "./styles.css";
interface DealTenantInformationProps {
  className?: string;
  dealId: string;
  readOnly?: boolean;
}

export const DealTenantInformationCard: FC<DealTenantInformationProps> = ({
  className,
  dealId,
  readOnly = false,
  ...props
}) => {
  const prefix = "acq-deal-summary-tenant-information";

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");
  const { data = defaultPaginatedData, isLoading } = useDealTenantInformation({
    deal: dealId,
    page: String(page),
    ordering: ordering,
  });

  const {
    state,
    resetModalState,
    viewTenantInformation,
    createTenantInformation,
    editTenantInformation,
    deleteTenantInformation,
  } = useDealTenantInformationModal();

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onView = (item: DealTenantInformation) => {
    viewTenantInformation({
      item,
      Form: ViewTenantInformationForm,
      ...modalActions,
    });
  };

  const onCreate = () =>
    createTenantInformation({
      Form: CreateTenantInformationForm,
      useMutation:
        useMutateDealTenantInformation as GenericDealTenantInformationUseMutation,
      ...modalActions,
    });

  const onEdit = (item: DealTenantInformation) => {
    editTenantInformation({
      item,
      Form: EditTenantInformationForm,
      useMutation:
        useMutatePatchDealTenantInformation as GenericDealTenantInformationUseMutation,
      ...modalActions,
    });
  };

  const onDelete = (item: DealTenantInformation) => {
    deleteTenantInformation({
      item,
      Form: DeleteTenantInformationForm,
      useMutation:
        useMutateDeleteDealTenantInformation as GenericDealTenantInformationUseMutation,
      ...modalActions,
    });
  };

  return (
    <CardWithHeader
      icon={<InformationCircleIcon />}
      title="Deal Tenant Information"
      headerActions={
        !readOnly ? <Button onClick={onCreate}>Add Tenant</Button> : null
      }
      className={getClasses()}
      bodyPadding={false}
      {...props}
    >
      <DealTenantInformationTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        data={data.results}
        page={page}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
        readOnly={readOnly}
        tableActions={(item: DealTenantInformation) => (
          <DealTenantInformationTableActions
            readOnly={readOnly}
            onView={() => onView(item)}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        )}
      />
      <DealTenantInformationModal
        {...state}
        onCancel={() => resetModalState()}
      />
    </CardWithHeader>
  );
};
