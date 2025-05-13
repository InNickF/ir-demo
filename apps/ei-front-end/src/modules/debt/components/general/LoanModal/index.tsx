import { Modal } from "in-ui-react";
import { FC } from "react";

import { LegacyDebtLoanPayload } from "@/modules/debt/typings/loans";
import "./styles.css";
import { LoanModalProps } from "./types";

export const LoanModal: FC<LoanModalProps> = ({
  item,
  onAction,
  onCancel,
  Form,
  header,
  modal,
  size,
  actionText,
  cancelText,
}) => {
  return (
    <Modal
      disclosure={<span className="hidden"></span>}
      modal={modal}
      visible={modal}
      size={size}
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
              onAction={(item: LegacyDebtLoanPayload) => {
                onAction(item);
              }}
              onCancel={() => {
                onCancel();
              }}
              actionText={actionText}
              cancelText={cancelText}
            />
          ) : null}
        </>
      )}
    </Modal>
  );
};
