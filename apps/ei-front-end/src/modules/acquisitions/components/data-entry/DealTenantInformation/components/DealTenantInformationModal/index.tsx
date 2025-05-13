import { DealTenantInformation } from "@/acquisitions/typings/deals";
import { Modal } from "in-ui-react";
import { FC } from "react";
import "./styles.css";
import { DealTenantInformationModalProps } from "./types";

export const DealTenantInformationModal: FC<
  DealTenantInformationModalProps
> = ({
  item,
  modal,
  Form,
  header,
  size,
  actionText,
  cancelText,
  onAction,
  onCancel,
  useMutation,
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
              onAction={(item: DealTenantInformation) => {
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
