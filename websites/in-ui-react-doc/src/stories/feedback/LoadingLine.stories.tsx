import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  LoadingLine,
  LoadingLineProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/LoadingLine",
  component: LoadingLine,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LoadingLine>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadingLine> = (args) => (
  <LoadingLine {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  role: "alert",
  size: "normal",
  velocity: "default",
  animation: "default",
  "aria-busy": true,
  className: "",
  title: "Loading animation",
} as LoadingLineProps;
