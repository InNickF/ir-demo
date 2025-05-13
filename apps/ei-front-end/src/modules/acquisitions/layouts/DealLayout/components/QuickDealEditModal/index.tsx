import { IsLoadingProp } from "@/commons/typings";
import { ExtendedDealInformation } from "@/acquisitions/typings/deals";
import { Modal } from "in-ui-react";
import { FC } from "react";
import { DealCommonAttributesForm } from "./components/DealCommonAttributtesForm";

interface QuickDealEditModal extends IsLoadingProp {
  deal: ExtendedDealInformation;
  modal: boolean;
  onAction: () => void;
}

export const QuickDealEditModal: FC<QuickDealEditModal> = ({
  modal,
  deal,
  onAction,
}) => {
  return (
    <Modal
      disclosure={<span className="hidden"></span>}
      modal={modal}
      visible={modal}
      className="acq-quick-deal-edit-modal"
    >
      {() => <DealCommonAttributesForm deal={deal} onAction={onAction} />}
    </Modal>
  );
};
