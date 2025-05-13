import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tag, TagProps } from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Hello Word",
} as TagProps;

export const WithAction = Template.bind({});
WithAction.args = {
  text: "Hello Word",
  id: "this-is-an-id",
  action: (id) => console.log(id),
} as TagProps;
export const WithLeftAction = Template.bind({});
WithLeftAction.args = {
  text: "Hello Word",
  id: "this-is-an-id",
  iconPosition: "left",
  action: (id) => console.log(id),
} as TagProps;

export const Sliced = Template.bind({});
Sliced.args = {
  text: "Hello Word with a long text and tooltip!",
  textSliceLength: 21,
} as TagProps;

export const Success = Template.bind({});
Success.args = {
  text: "Hello Word with a long text and tooltip!",
  textSliceLength: 21,
  color: "success",
} as TagProps;

export const Warning = Template.bind({});
Warning.args = {
  text: "Hello Word with a long text and tooltip!",
  textSliceLength: 21,
  color: "warning",
} as TagProps;

export const Error = Template.bind({});
Error.args = {
  text: "Hello Word with a long text and tooltip!",
  textSliceLength: 21,
  color: "error",
} as TagProps;
