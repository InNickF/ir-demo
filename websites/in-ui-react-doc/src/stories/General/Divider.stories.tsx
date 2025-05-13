import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Divider, DividerProps } from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} as ComponentMeta<typeof Divider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args}></Divider>
);

export const Default = Template.bind({});
Default.args = {
  orientation: "horizontal",
} as DividerProps;
