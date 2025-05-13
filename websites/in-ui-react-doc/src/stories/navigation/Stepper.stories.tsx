import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Stepper,
  StepperProps,
  StepperComponentGroup,
} from "../../../../../packages/in-ui-react/src/lib";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Stepper",
  component: Stepper,
  subcomponents: {
    "Stepper.StepHeader": Stepper.StepHeader,
    "Stepper.StepContent": Stepper.StepContent,
    "Stepper.Step": Stepper.Step,
  },
} as ComponentMeta<StepperComponentGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Stepper> = (args) => {
  const [current, setCurrent] = useState(1);
  const [steps, setSteps] = useState<
    Array<{ step: number; title: string; description: string; status: string }>
  >([
    {
      step: 1,
      title: "Name of step 1",
      description: "Text helper step",
      status: "base",
    },
    {
      step: 2,
      title: "Name of step 2",
      description: "Text helper step",
      status: "base",
    },
    {
      step: 3,
      title: "Name of step 3",
      description: "Text helper step",
      status: "base",
    },
  ]);
  return (
    <>
      <Stepper {...args} current={current}>
        <Stepper.StepHeader>
          {steps?.map((item, index) => (
            <Stepper.Step
              key={`${item?.title}-${index}`}
              step={item?.step}
              title={item?.title}
              icon={<InformationCircleIcon />}
              description={item?.description}
              isReady={item?.status === "ready"}
              onClick={() => {
                setSteps((steps) => {
                  return [
                    ...steps.slice(0, index),
                    {
                      ...steps?.[index],
                      status: item?.status === "ready" ? "ready" : "base",
                    },
                    ...steps.slice(index + 1, steps?.length),
                  ];
                });
                setCurrent(item?.step);
              }}
            ></Stepper.Step>
          ))}
        </Stepper.StepHeader>

        <Stepper.StepContent step={1}>
          <div className="relative p-5">
            <p>content 1</p>
          </div>
        </Stepper.StepContent>
        <Stepper.StepContent step={2}>
          <div className="relative p-5">
            <p>content 2</p>
          </div>
        </Stepper.StepContent>
        <Stepper.StepContent step={3}>
          <div className="relative p-5">
            <p>content 3</p>
          </div>
        </Stepper.StepContent>
      </Stepper>
    </>
  );
};

const WithStatusReadyTemplate: ComponentStory<typeof Stepper> = (args) => {
  const [current, setCurrent] = useState(1);
  const [steps, setSteps] = useState<
    Array<{ step: number; title: string; description: string; status: string }>
  >([
    {
      step: 1,
      title: "Name of step 1",
      description: "Text helper step",
      status: "ready",
    },
    {
      step: 2,
      title: "Name of step 2",
      description: "Text helper step",
      status: "ready",
    },
    {
      step: 3,
      title: "Name of step 3",
      description: "Text helper step",
      status: "ready",
    },
  ]);
  return (
    <>
      <Stepper {...args} current={current}>
        <Stepper.StepHeader>
          {steps?.map((item, index) => (
            <Stepper.Step
              key={`${item?.title}-${index}`}
              step={item?.step}
              title={item?.title}
              icon={<InformationCircleIcon />}
              description={item?.description}
              isReady={item?.status === "ready"}
              onClick={() => {
                setSteps((steps) => {
                  return [
                    ...steps.slice(0, index),
                    {
                      ...steps?.[index],
                      status: item?.status === "ready" ? "ready" : "base",
                    },
                    ...steps.slice(index + 1, steps?.length),
                  ];
                });
                setCurrent(item?.step);
              }}
            ></Stepper.Step>
          ))}
        </Stepper.StepHeader>

        <Stepper.StepContent step={1}>
          <div className="relative p-5">
            <p>content 1</p>
          </div>
        </Stepper.StepContent>
        <Stepper.StepContent step={2}>
          <div className="relative p-5">
            <p>content 2</p>
          </div>
        </Stepper.StepContent>
        <Stepper.StepContent step={3}>
          <div className="relative p-5">
            <p>content 3</p>
          </div>
        </Stepper.StepContent>
      </Stepper>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {} as StepperProps;

export const WithStatusReady = WithStatusReadyTemplate.bind({});
Default.args = {} as StepperProps;
