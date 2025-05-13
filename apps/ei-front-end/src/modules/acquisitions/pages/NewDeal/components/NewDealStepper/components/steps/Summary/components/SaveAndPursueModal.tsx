import { IsLoadingProp } from "@/commons/typings";
import { Button, Modal } from "in-ui-react";
import { FC } from "react";

interface SaveAndDontPursueModalProps extends IsLoadingProp {
  onSave: () => void;
  disabled?: boolean;
  canDontPursue?: boolean;
}

export const SaveAndDontPursueModal: FC<SaveAndDontPursueModalProps> = ({
  onSave,
  isLoading,
  disabled = false,
  canDontPursue,
}) => {
  const messageMessage = canDontPursue
    ? `Are you sure you want to create a new deal and set its phase as DEAD?`
    : `You can't create a new deal and set its phase as DEAD because you did not specify the DEAD reason in the "Deal Information" section.`;

  return (
    <Modal
      disclosure={
        <Button
          kind="solid"
          color="warning"
          loading={isLoading}
          disabled={disabled}
        >
          Save & Don&apos;t Pursue
        </Button>
      }
    >
      {(dialog) => (
        <>
          <Modal.Header
            onClose={() => {
              dialog.hide();
            }}
          >
            Save & Don&apos;t Pursue
          </Modal.Header>
          <Modal.Body>{messageMessage}</Modal.Body>
          <div className="flex">
            <Button
              block
              kind="ghost"
              onClick={() => {
                dialog.hide();
              }}
            >
              Cancel
            </Button>
            <Button
              block
              color="warning"
              disabled={!canDontPursue}
              onClick={() => {
                if (canDontPursue) {
                  onSave();
                  dialog.hide();
                }
              }}
            >
              Yes, Save & Don&apos;t Pursue
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
