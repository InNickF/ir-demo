import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import { TextArea, TextAreaProps } from "../../../../../packages/in-ui-react/src/lib";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default {
  title: "Component/TextArea",
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStoryFn<typeof TextArea> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Description",
} as TextAreaProps;

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "Description",
  leftIcon: <LockClosedIcon />,
} as TextAreaProps;

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Description",
  leftIcon: <LockClosedIcon />,
  hint: "Your description must be long",
} as TextAreaProps;

export const WithError = Template.bind({});
WithError.args = {
  label: "Description",
  value: "lorem ipsum",
  leftIcon: <LockClosedIcon />,
  hint: "Your description must be long",
  error: "Your description is not long",
} as TextAreaProps;

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: "Description",
  leftIcon: <LockClosedIcon />,
  tooltip: "Your description must be long",
} as TextAreaProps;

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Description",
  leftIcon: <LockClosedIcon />,
  tooltip: "Your description must be long",
  disabled: true,
} as TextAreaProps;
