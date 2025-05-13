import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Tooltip,
  Button,
  TooltipProps,
} from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <Button>I'm a tooltip</Button>
  </Tooltip>
);
export const Default = Template.bind({});
Default.args = {
  content: "Hi",
} as TooltipProps;
