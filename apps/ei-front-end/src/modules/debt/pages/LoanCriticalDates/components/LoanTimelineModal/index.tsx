import { Modal } from "in-ui-react";
import { FC } from "react";
import { DebtLoanTimeline } from "@/modules/debt/typings/loans";
import "./styles.css";
import { LoanTimelineModalProps } from "./types";

export const LoanTimelineModal: FC<LoanTimelineModalProps> = ({
  item,
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
      modal={modal}
      visible={modal}
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
              item={item}
              onAction={(item: DebtLoanTimeline) => {
                onAction(item);
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
