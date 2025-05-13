import { FundTimeline } from "@/modules/assets/typings/funds";
import { Modal } from "in-ui-react";
import { FC } from "react";
import "./styles.css";
import { FundCriticalDatesModalProps } from "./types";

export const FundCriticalDatesModal: FC<FundCriticalDatesModalProps> = ({
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
              onAction={(item: FundTimeline) => {
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
