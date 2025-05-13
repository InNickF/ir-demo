import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import {
  Checkbox,
  CheckboxProps,
} from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStoryFn<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox label",
} as CheckboxProps;

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: "Checkbox label",
  tooltip: "Testing a tooltip",
} as CheckboxProps;

export const WithError = Template.bind({});
WithError.args = {
  label: "Checkbox label",
  error: "This field is required",
} as CheckboxProps;

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Checkbox label",
  disabled: true,
} as CheckboxProps;

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: "Checkbox label",
  disabled: true,
  checked: true,
} as CheckboxProps;
