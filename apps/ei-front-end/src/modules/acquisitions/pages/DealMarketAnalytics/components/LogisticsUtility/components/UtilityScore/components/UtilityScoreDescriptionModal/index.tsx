import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "in-ui-react";
import "./styles.css";

export const UtilityScoreDescriptionModal = () => {
  return (
    <Modal
      size="big"
      disclosure={
        <Button
          className="acq-utility-score__info"
          size="small"
          title="Information"
          icon={<InformationCircleIcon />}
          kind="ghost"
        >
          Information
        </Button>
      }
    >
      {(dialog) => (
        <>
          <Modal.Header
            onClose={() => {
              dialog.hide();
            }}
          >
            Utility Score
          </Modal.Header>
          <Modal.Body>
            <p>
              The EI Logistics Utility product is a system designed to
              objectively estimate current market rent for individual properties
              while providing insight into positive and negative influences on
              the rent estimate. It&apos;s created by leveraging thousands of
              lease comps, property features, and location details and then
              applying machine learning to find and exploit statistical
              relationships between selected inputs and strike rent. The system
              assumes the lease would be executed today for a 5 year lease term,
              4% rent increases, 3 months of free rent, and no tenant
              improvement allowances.
            </p>
            <br />
            <p>
              The Logistics Utility Score itself is a percentile rank of
              estimated rent to allow comparison to other properties within the
              same market. For example, a property with an overall Logistics
              Utility Score of 82% would imply that in similar market
              conditions, 82% of properties in the same market would rent for
              less than the subject property. Further, we can break the score
              down into the Location Score and Building Score, providing the
              same percentile rank but only considering details related to the
              property location and building features, respectively. Even
              further, the scoring system can be broken down into individual
              features such as clear height, loading dock ratio, etc. to allow
              the analyst to see the increase or decrease in rent from specific
              property or location attributes relative to the average property
              within the same market.
            </p>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};
