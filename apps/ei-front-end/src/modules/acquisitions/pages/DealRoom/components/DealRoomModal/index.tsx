import { DealRoomItem } from "@/acquisitions/typings/deals";
import { Modal } from "in-ui-react";
import { FC } from "react";

import "./styles.css";
import { DealRoomModalProps } from "./types";

export const DealRoomModal: FC<DealRoomModalProps> = ({
  item,
  labels,
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
              labels={labels}
              onAction={(item: DealRoomItem) => {
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
