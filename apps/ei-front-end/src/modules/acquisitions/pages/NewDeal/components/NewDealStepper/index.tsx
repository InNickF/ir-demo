import { Step } from "@/acquisitions/hooks/useStepper";
import { ButtonGroup, Stepper } from "in-ui-react";
import { FC, useEffect, useState } from "react";
import { StepHeader } from "./components/StepHeader";
import { useNewDealStepper } from "./components/hooks/useNewDealStepper";
import { useSelectAdditionalDealInformation } from "./components/hooks/useSelectAdditionalDealInformation";
import { BackOfTheNapkinStep } from "./components/steps/BackOfTheNapkin";
import { DealInformationStep } from "./components/steps/DealInformation";
import { DealRoomStep } from "./components/steps/DealRoom";
import { PhotosStep } from "./components/steps/Photos";
import { SummaryStep } from "./components/steps/Summary";
import { UnderwritingModelUploadStep } from "./components/steps/UnderwritingModelUpload";
import { NewDealState } from "./types";

interface NewDealStepperProps {
  initialSteps: Step[];
}

const initialNewDealState: NewDealState = {
  dealInformation: {
    address: "",
    name: "",
    purchase_price: 0,
    equity_percentage: 0,
    psf: 0,
    equity: 0,
    sf: 0,
    officer: {
      label: null,
      value: null,
    },
    analyst: {
      label: null,
      value: null,
    },
    fund: {
      label: null,
      value: null,
    },
    type: {
      label: null,
      value: null,
    },
    strategy: "",
    comments: "",
    fund_name: "",
    latitude: "",
    longitude: "",
  },
  dealAttachments: [],
  dealRoomItems: [],
  dealBackOfTheNapkin: {},
  dealUnderwritingModel: null,
};

export const NewDealStepper: FC<NewDealStepperProps> = ({ initialSteps }) => {
  const [newDeal, setNewDeal] = useState(initialNewDealState);

  const { additionalDealInformationFilter, additionalDealInformationOptions } =
    useSelectAdditionalDealInformation();

  const { current, onHeaderClick, setNextStep, setPreviousStep, steps } =
    useNewDealStepper({
      initialSteps,
      additionalDealInformationFilter,
    });

  useEffect(() => {
    const isBackOfTheNapkin =
      additionalDealInformationFilter === "back_of_the_napkin";

    setNewDeal((prevState) => ({
      ...prevState,
      dealUnderwritingModel: isBackOfTheNapkin
        ? null
        : prevState.dealUnderwritingModel,
      dealBackOfTheNapkin: isBackOfTheNapkin
        ? prevState.dealBackOfTheNapkin
        : {},
    }));
  }, [additionalDealInformationFilter]);

  const handleHeaderClick = (item: Step) => {
    steps[0]?.isReady && onHeaderClick(item);
  };

  return (
    <Stepper>
      <StepHeader steps={steps} current={current} onClick={handleHeaderClick} />
      <DealInformationStep
        current={current}
        onBack={setPreviousStep}
        onContinue={(form) => {
          setNewDeal({ ...newDeal, dealInformation: form });
          setNextStep();
        }}
      />
      {current === 2 ? (
        <div className="flex">
          <ButtonGroup
            items={additionalDealInformationOptions}
            active={additionalDealInformationFilter}
            className="mb-4"
          />
        </div>
      ) : null}
      {additionalDealInformationFilter === "underwriting_information" ? (
        <UnderwritingModelUploadStep
          current={current}
          onBack={setPreviousStep}
          onContinue={({ file }) => {
            setNewDeal({ ...newDeal, dealUnderwritingModel: file });
            setNextStep();
          }}
        />
      ) : (
        <BackOfTheNapkinStep
          deal={newDeal.dealInformation}
          current={current}
          onBack={setPreviousStep}
          onContinue={(form) => {
            setNewDeal({
              ...newDeal,
              dealBackOfTheNapkin: form,
            });
            setNextStep();
          }}
        />
      )}
      <PhotosStep
        current={current}
        onBack={setPreviousStep}
        onContinue={(photos) => {
          setNewDeal({ ...newDeal, dealAttachments: photos });
          setNextStep();
        }}
      />
      <DealRoomStep
        current={current}
        onBack={setPreviousStep}
        onContinue={(items) => {
          setNewDeal({ ...newDeal, dealRoomItems: items });
          if (steps[1]?.isReady) {
            setNextStep();
          } else {
            setNextStep(2);
          }
        }}
      />
      <SummaryStep
        summary={newDeal}
        current={current}
        onBack={setPreviousStep}
        onContinue={() => null}
      />
    </Stepper>
  );
};
