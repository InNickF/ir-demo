import { StepProps } from "in-ui-react";
import { useEffect, useState } from "react";
import { AdditionalDealInformationFilters } from "./useSelectAdditionalDealInformation";

export type Step = Omit<StepProps, "current">;
interface useNewDealStepperProps {
  initialSteps: Step[];
  initialCurrent?: number;
  additionalDealInformationFilter?: AdditionalDealInformationFilters;
}
export const useNewDealStepper = ({
  initialSteps,
  initialCurrent = 1,
  additionalDealInformationFilter,
}: useNewDealStepperProps) => {
  const [current, setCurrent] = useState(initialCurrent);
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const underwritingModelStepOverrides = {
    title: "Underwriting Information",
    description: "Upload Underwriting File",
  };

  useEffect(() => {
    setSteps((prev) => {
      return prev.map((item) => {
        if (item.step === 2) {
          if (additionalDealInformationFilter === "underwriting_information") {
            return {
              ...item,
              ...underwritingModelStepOverrides,
            };
          }

          return {
            ...item,
            ...initialSteps[1],
          };
        }
        return item;
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSteps, additionalDealInformationFilter]);

  const setNextStep = (to: number = null) => {
    const updatedSteps = steps.map((item) => {
      if (item.step === current) {
        return {
          ...item,
          isReady: true,
        };
      }
      return item;
    });

    setSteps(updatedSteps);
    setCurrent(to || current + 1);
  };

  const setPreviousStep = () => {
    setCurrent(current - 1);
  };

  const onHeaderClick = (item: Step) => {
    setCurrent(item.step);
  };

  return {
    current,
    steps,
    onHeaderClick,
    setNextStep,
    setPreviousStep,
    setCurrentStep: setCurrent,
  };
};
