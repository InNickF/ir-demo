import { StepProps } from "in-ui-react";
import { useState } from "react";

export type Step = Omit<StepProps, "current">;
interface useStepperProps {
  initialSteps: Step[];
  initialCurrent?: number;
}
export const useStepper = ({
  initialSteps,
  initialCurrent = 1,
}: useStepperProps) => {
  const [current, setCurrent] = useState(initialCurrent);
  const [steps, setSteps] = useState<Step[]>(initialSteps);

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
