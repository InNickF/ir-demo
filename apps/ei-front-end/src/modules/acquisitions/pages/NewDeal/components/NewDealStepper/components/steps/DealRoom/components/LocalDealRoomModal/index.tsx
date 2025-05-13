import { LocalDealRoomItem } from "@/acquisitions/typings/deals";
import { Modal } from "in-ui-react";
import { FC } from "react";
import { LocalDealRoomModalProps } from "./types";
import "./styles.css";

export const LocalDealRoomModal: FC<LocalDealRoomModalProps> = ({
  item,
  labels,
  onAction,
  onCancel,
  Form,
  header,
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
              labels={labels}
              onAction={(item: LocalDealRoomItem) => {
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
