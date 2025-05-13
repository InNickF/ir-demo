import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Container,
  ContainerProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Container",
  component: Container,
} as ComponentMeta<typeof Container>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args}>Lorem Ipsum</Container>
);

export const Default = Template.bind({});
Default.args = {
  fluid: false,
} as ContainerProps;
