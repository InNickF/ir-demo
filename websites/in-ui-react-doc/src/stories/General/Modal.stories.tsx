import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import {
  Modal,
  ModalProps,
  Button,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Modal",
  component: Modal,
  subcomponents: {
    "Modal.Header": Modal.Header,
    "Modal.Body": Modal.Body,
  },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStoryFn<typeof Modal> = (args) => {
  return (
    <Modal {...args} disclosure={<Button>Open Modal</Button>}>
      {(dialog) => (
        <>
          <Modal.Header
            onClose={() => {
              dialog.hide();
            }}
          >
            This is a modal title
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In saepe
            ipsam, repellat illo iusto atque veritatis illum optio quo eum eius
            quis magni nemo quae, distinctio quibusdam placeat consequatur
            accusamus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Modal.Body>
          <div className="flex">
            <Button
              block
              kind="ghost"
              onClick={() => {
                dialog.hide();
              }}
            >
              Close
            </Button>
            <Button
              block
              onClick={() => {
                dialog.hide();
              }}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {
  disclosure: <Button>Open Modal</Button>,
} as ModalProps;
