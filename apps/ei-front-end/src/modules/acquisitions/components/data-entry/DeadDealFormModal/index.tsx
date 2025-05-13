import { Modal, ModalProps } from "in-ui-react";
import { FC } from "react";
import { DeadDealForm, DeadDealFormProps } from "../DeadDealForm";

interface DeadDealFormModalProps {
  show: boolean;
  formProps: DeadDealFormProps | null;
  className?: ModalProps["className"];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const DeadDealFormModal: FC<DeadDealFormModalProps> = ({
  show,
  onSuccess,
  onCancel,
  className,
  formProps,
}) => {
  return (
    <Modal
      disclosure={<span className="hidden"></span>}
      className={className}
      modal={show}
      visible={show}
    >
      {() => (
        <>
          <Modal.Header
            onClose={() => {
              onCancel?.();
            }}
          >
            Send deal to dead.
          </Modal.Header>
          <section className="p-3">
            {formProps?.dealAddress ? (
              <p className="mb-4">
                You are sending to dead:{" "}
                <strong className="font-bold">{formProps?.dealAddress}</strong>.
              </p>
            ) : null}
            {formProps ? (
              <DeadDealForm
                {...formProps}
                onSuccess={onSuccess}
                onCancel={() => {
                  onCancel?.();
                }}
              />
            ) : null}
          </section>
        </>
      )}
    </Modal>
  );
};
