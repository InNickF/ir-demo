import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import { Select } from "../../../../../packages/in-ui-react/src/lib";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default {
  title: "Component/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStoryFn<typeof Select> = (args) => (
  <Select {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Person",
  options: [
    { value: "nick", label: "Nick" },
    { value: "jesus", label: "Jesus" },
  ],
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: <UserGroupIcon />,
};

export const WithHint = Template.bind({});
WithHint.args = {
  ...Default.args,
  icon: <UserGroupIcon />,
  hint: "Select an user",
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  icon: <UserGroupIcon />,
  hint: "Select an user",
  error: "You have to select an user",
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...Default.args,
  icon: <UserGroupIcon />,
  tooltip: "Users can  edit information",
};

export const IsMultiple = Template.bind({});
IsMultiple.args = {
  ...Default.args,
  icon: <UserGroupIcon />,
  tooltip: "Users can  edit information",
  isMulti: true,
};
