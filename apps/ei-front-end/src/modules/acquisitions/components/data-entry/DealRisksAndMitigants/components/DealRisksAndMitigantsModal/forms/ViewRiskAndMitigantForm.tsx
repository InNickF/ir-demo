import { Button, Heading, Modal } from "in-ui-react";
import { FC } from "react";
import "../styles.css";
import { DealRisksAndMitigantsFormProps } from "../types";

export const ViewRiskAndMitigantForm: FC<DealRisksAndMitigantsFormProps> = ({
  item,
  onCancel,
}) => {
  return (
    <form className="acq-deal-risks-and-mitigants-form__modal">
      <Modal.Body>
        <div className="flex flex-col gap-5">
          <div>
            <Heading kind="h3">Risk</Heading>
            <p>{item?.risk}</p>
          </div>
          <div>
            <Heading kind="h3">Mitigant</Heading>
            <p>{item?.mitigant}</p>
          </div>
        </div>
      </Modal.Body>
      <footer className="acq-deal-risks-and-mitigants-form__footer">
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
