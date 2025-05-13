import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card, CardProps } from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <p>Hello word</p>
  </Card>
);
export const Default = Template.bind({});
Default.args = {};

export const WithoutPadding = Template.bind({});
WithoutPadding.args = {
  padding: false,
} as CardProps;

export const WithShadow = Template.bind({});
WithShadow.args = {
  shadow: "2",
} as CardProps;

export const WithShadowHover = Template.bind({});
WithShadowHover.args = {
  shadow: "0",
  hover: true,
} as CardProps;
