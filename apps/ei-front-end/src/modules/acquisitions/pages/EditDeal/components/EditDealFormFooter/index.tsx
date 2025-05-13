import { DeadDealFormModal } from "@/modules/acquisitions/components/data-entry/DeadDealFormModal";
import { useDeadDealFormState } from "@/modules/acquisitions/components/data-entry/DeadDealFormModal/hooks/useDeadDealFormState";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface EditDealFormFooterProps {
  onSave?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  canSave?: boolean;
  dealId: Deal["id"];
  dealAddress: Deal["address"];
  dealPhase: Deal["phase"];
}

export const EditDealFormFooter: FC<EditDealFormFooterProps> = ({
  onSave,
  onCancel,
  canSave = true,
  isLoading = false,
  dealId,
  dealAddress,
  dealPhase,
}) => {
  const {
    showDeadModal,
    deadModalFormProps,
    showDeadDealFormModal,
    hideDeadDealFormModal,
  } = useDeadDealFormState();

  const cleanDeadFormState = () => {
    hideDeadDealFormModal();
  };

  const onDeleteDeal = () => {
    showDeadDealFormModal({
      dealId,
      dealAddress,
      redirectToDeal: true,
      defaultValues: {
        sorting: 0,
      },
    });
  };

  const getFooterClasses = (): string => {
    const classes = ["acq-edit-deal-form-footer"];
    if (dealPhase?.value === "DEAD") {
      classes.push("acq-edit-deal-form-footer--centered");
    }
    return classes.join(" ");
  };

  const getMainButtonContainerClasses = (): string => {
    const classes = ["acq-edit-deal-form-footer__main-button-container"];
    if (dealPhase?.value === "DEAD") {
      classes.push(
        "acq-edit-deal-form-footer__main-button-container--centered"
      );
    }
    return classes.join(" ");
  };

  const getSecondaryButtonContainerClasses = (): string => {
    const classes = ["acq-edit-deal-form-footer__secondary-button-container"];
    if (dealPhase?.value === "DEAD") {
      classes.push(
        "acq-edit-deal-form-footer__secondary-button-container--hidden"
      );
    }
    return classes.join(" ");
  };

  const getButtonClasses = (): string => {
    const classes = ["acq-edit-deal-form-footer__button"];
    return classes.join(" ");
  };

  return (
    <>
      <DeadDealFormModal
        show={showDeadModal}
        formProps={deadModalFormProps}
        onSuccess={() => {
          cleanDeadFormState();
        }}
        onCancel={() => {
          cleanDeadFormState();
        }}
      />
      <footer className={getFooterClasses()}>
        <section className={getSecondaryButtonContainerClasses()}>
          <Button
            kind="outline"
            color="error"
            icon={<TrashIcon />}
            onClick={onDeleteDeal}
          >
            Move to Dead
          </Button>
        </section>
        <section className={getMainButtonContainerClasses()}>
          <Button
            className={getButtonClasses()}
            type="submit"
            onClick={onSave}
            disabled
            loading={isLoading}
          >
            Save
          </Button>
          <Button kind="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </section>
      </footer>
    </>
  );
};
