import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { usePagination } from "@/commons/hooks/usePagination";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { FC, useState } from "react";
import { DealRisksAndMitigants as DealRisksAndMitigants } from "@/modules/acquisitions/typings/deals";
import { GenericDealRisksAndMitigantsUseMutation as GenericDealRisksAndMitigantsUseMutation } from "./components/DealRisksAndMitigantsModal/types";
import {
  CreateRiskAndMitigantForm,
  DeleteRiskAndMitigantForm,
  EditRiskAndMitigantForm,
  ViewRiskAndMitigantForm,
} from "./components/DealRisksAndMitigantsModal/forms";
import { useDealRisksAndMitigantsModal } from "./components/DealRisksAndMitigantsModal/hooks/useDealRisksAndMitigantsModal";
import { DealRisksAndMitigantsModal } from "./components/DealRisksAndMitigantsModal";
import {
  useMutateDealRiskAndMitigant as useMutateDealRiskAndMitigant,
  useMutateDeleteDealRiskAndMitigant as useMutateDeleteDealRiskAndMitigants,
  useMutatePatchDealRiskAndMitigant as useMutatePatchDealRiskAndMitigants,
} from "@/modules/acquisitions/services/mutations/deals";
import { DealRisksAndMitigantsTable } from "./components/DealRisksAndMitigantsTable";
import { DealRisksAndMitigantsTableActions } from "./components/DealRisksAndMitigantsTableActions";
import { defaultPaginatedData } from "@/commons/utils";
import { useDealRisksAndMitigants } from "@/modules/acquisitions/services/queries/deals";
import "./styles.css";

interface DealRisksAndMitigantsProps {
  className?: string;
  dealId: string;
  readOnly?: boolean;
}
export const DealRisksAndMitigantsCard: FC<DealRisksAndMitigantsProps> = ({
  className,
  dealId,
  readOnly = false,
  ...props
}) => {
  const prefix = "acq-deal-summary-risk-and-mitigants";

  const { page, setPage } = usePagination();
  const [ordering, setOrdering] = useState("");

  const { data = defaultPaginatedData, isLoading } = useDealRisksAndMitigants({
    deal: dealId,
    page: String(page),
    ordering: ordering,
  });

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };
  const {
    state,
    resetModalState,
    viewRiskAndMitigant,
    createRiskAndMitigant,
    editRiskAndMitigant,
    deleteRiskAndMitigant,
  } = useDealRisksAndMitigantsModal();

  const modalActions = {
    onCancel: () => resetModalState(),
    onAction: () => resetModalState(),
  };

  const onView = (item: DealRisksAndMitigants) => {
    viewRiskAndMitigant({
      item,
      Form: ViewRiskAndMitigantForm,
      ...modalActions,
    });
  };

  const onCreate = () =>
    createRiskAndMitigant({
      Form: CreateRiskAndMitigantForm,
      useMutation:
        useMutateDealRiskAndMitigant as GenericDealRisksAndMitigantsUseMutation,
      ...modalActions,
    });

  const onEdit = (item: DealRisksAndMitigants) => {
    editRiskAndMitigant({
      item,
      Form: EditRiskAndMitigantForm,
      useMutation:
        useMutatePatchDealRiskAndMitigants as GenericDealRisksAndMitigantsUseMutation,
      ...modalActions,
    });
  };

  const onDelete = (item: DealRisksAndMitigants) => {
    deleteRiskAndMitigant({
      item,
      Form: DeleteRiskAndMitigantForm,
      useMutation:
        useMutateDeleteDealRiskAndMitigants as GenericDealRisksAndMitigantsUseMutation,
      ...modalActions,
    });
  };

  return (
    <CardWithHeader
      icon={<ExclamationTriangleIcon />}
      title="Deal Risks and Mitigants"
      headerActions={
        !readOnly ? (
          <Button onClick={onCreate}>Add Risk and Mitigant</Button>
        ) : null
      }
      className={getClasses()}
      bodyPadding={false}
      {...props}
    >
      <DealRisksAndMitigantsTable
        count={data.count}
        totalPages={data.total_pages}
        isLoading={isLoading}
        data={data.results}
        page={page}
        setPage={setPage}
        ordering={ordering}
        setOrdering={setOrdering}
        readOnly={readOnly}
        tableActions={(item: DealRisksAndMitigants) => (
          <DealRisksAndMitigantsTableActions
            readOnly={readOnly}
            onView={() => onView(item)}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        )}
      />
      <DealRisksAndMitigantsModal
        {...state}
        onCancel={() => resetModalState()}
      />
    </CardWithHeader>
  );
};
