import { HTMLRenderer } from "@/commons/components/data-display/HTMLRenderer";
import { Button, Heading, Modal } from "in-ui-react";
import { FC } from "react";
import "../styles.css";
import { DealTenantInformationFormProps } from "../types";

export const ViewTenantInformationForm: FC<DealTenantInformationFormProps> = ({
  item,
  onCancel,
}) => {
  return (
    <form className="acq-deal-tenant-information-form__modal">
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <Heading kind="h3">{item?.name}</Heading>
          <HTMLRenderer html={item?.description} />
        </div>
      </Modal.Body>
      <footer className="acq-deal-tenant-information-form__footer">
        <Button
          block
          kind="solid"
          onClick={() => {
            onCancel();
          }}
        >
          Close
        </Button>
      </footer>
    </form>
  );
};
