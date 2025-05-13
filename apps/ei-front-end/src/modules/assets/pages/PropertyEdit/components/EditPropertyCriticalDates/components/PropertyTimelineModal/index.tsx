import { PropertyTimeline } from "@/modules/assets/typings/property";
import { Modal } from "in-ui-react";
import { FC } from "react";
import "./styles.css";
import { PropertyTimelineModalProps } from "./types";

export const PropertyTimelineModal: FC<PropertyTimelineModalProps> = ({
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
              onAction={(item: PropertyTimeline) => {
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
