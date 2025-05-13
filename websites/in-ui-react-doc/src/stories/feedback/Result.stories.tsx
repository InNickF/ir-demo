import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Result,
  ResultProps,
  Button,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Result",
  component: Result,
} as ComponentMeta<typeof Result>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Result> = (args) => <Result {...args} />;

const WithChildrenTemplate: ComponentStory<typeof Result> = (args) => (
  <Result {...args}>
    <Button className="mt-4">Action</Button>
  </Result>
);

export const OnlyText = Template.bind({});
OnlyText.args = {
  description: <h4>Custom description</h4>,
  onlyText: true,
} as ResultProps;

export const Success = Template.bind({});
Success.args = {
  kind: "success",
  description: <h4>Success message example</h4>,
} as ResultProps;

export const Info = Template.bind({});
Info.args = {
  kind: "info",
  description: <h4>Info message example</h4>,
} as ResultProps;

export const Error = Template.bind({});
Error.args = {
  kind: "error",
  description: <h4>Error message example</h4>,
} as ResultProps;

export const WithChildren = WithChildrenTemplate.bind({});
WithChildren.args = {
  kind: "success",
  description: <h4>Success message example</h4>,
} as ResultProps;

