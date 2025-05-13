import { Button, Modal } from "in-ui-react";
import { FC } from "react";

interface GenericFormInModalProps {
  className?: string;
  modalButtonText?: string;
  modalHeaderText?: string;
  formInputs: JSX.Element;
  onSave: () => void;
  onClose: () => void;
}

export const GenericFormInModal: FC<GenericFormInModalProps> = ({
  modalButtonText,
  modalHeaderText,
  onClose,
}) => {
  return (
    <Modal
      size="big"
      disclosure={<Button title={modalButtonText}>{modalButtonText}</Button>}
      // workaround to prevent focus trap
      options={{ modal: false, animated: true }}
    >
      {(dialog) => (
        <>
          <Modal.Header
            onClose={() => {
              dialog.hide();
              onClose();
            }}
          >
            {modalHeaderText}
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="flex mt-6">
                <Button
                  kind="ghost"
                  block
                  onClick={() => {
                    onClose && onClose();
                  }}
                >
                  Close
                </Button>

                <Button block type="submit" disabled>
                  Save
                </Button>
              </div>
            </form>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};
