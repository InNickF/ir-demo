import { Step } from "@/acquisitions/hooks/useStepper";
import { Stepper } from "in-ui-react";
import { FC } from "react";
import "../styles.css";
interface StepHeaderProps {
  steps: Step[];
  onClick: (step: Step) => void;
  current: number;
}

export const StepHeader: FC<StepHeaderProps> = ({
  steps,
  current,
  onClick,
}) => {
  return (
    <Stepper.StepHeader current={current} className="mb-5">
      {steps.map((item) => (
        <Stepper.Step
          current={current}
          key={item.title}
          step={item.step}
          title={item.title}
          icon={item.icon}
          description={item.description}
          isReady={item.isReady}
          onClick={() => {
            onClick(item);
          }}
        />
      ))}
    </Stepper.StepHeader>
  );
};
