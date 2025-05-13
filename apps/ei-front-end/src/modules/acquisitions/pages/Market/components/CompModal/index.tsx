import { Modal } from "in-ui-react";
import { FC } from "react";
import { CompModalProps } from "../../types";

export const CompModal: FC<CompModalProps> = ({
  comp,
  onAction,
  onCancel,
  Form,
  header,
  useMutation,
  modal,
  actionText,
  cancelText,
}) => {
  return (
    <Modal
      disclosure={<span className="hidden"></span>}
      visible={modal}
      // workaround to prevent focus trap
      options={{ modal: false, animated: true }}
    >
      {() => (
        <>
          <Modal.Header
            onClose={() => {
              onCancel();
            }}
          >
            {header || null}
          </Modal.Header>
          {Form ? (
            <Form
              comp={comp}
              onAction={() => {
                onAction();
              }}
              onCancel={() => {
                onCancel();
              }}
              useMutation={useMutation}
              actionText={actionText}
              cancelText={cancelText}
            />
          ) : null}
        </>
      )}
    </Modal>
  );
};
