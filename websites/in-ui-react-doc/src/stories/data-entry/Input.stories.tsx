import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import { Input, InputProps } from "../../../../../packages/in-ui-react/src/lib";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default {
  title: "Component/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Name",
} as InputProps;

export const Password = Template.bind({});
Password.args = {
  label: "Password",
  type: "password",
  leftIcon: <LockClosedIcon />,
} as InputProps;

export const WithHint = Template.bind({});
WithHint.args = {
  label: "Password",
  type: "password",
  leftIcon: <LockClosedIcon />,
  hint: "Your password must be strong",
} as InputProps;

export const WithError = Template.bind({});
WithError.args = {
  label: "Password",
  type: "text",
  value: "12345",
  leftIcon: <LockClosedIcon />,
  hint: "Your password must be strong",
  error: "Your password is not strong",
} as InputProps;

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: "Password",
  type: "password",
  leftIcon: <LockClosedIcon />,
  tooltip: "Your password must be strong",
} as InputProps;

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Password",
  type: "password",
  leftIcon: <LockClosedIcon />,
  tooltip: "Your password must be strong",
  disabled: true,
} as InputProps;
