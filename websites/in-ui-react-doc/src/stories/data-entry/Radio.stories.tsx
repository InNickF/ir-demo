import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import { Radio, RadioProps } from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/Radio",
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStoryFn<typeof Radio> = (args) => {
  return (
    <>
      <Radio className="mb-2" checked {...args} />
      <Radio {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Radio label",
  value: "1",
  name: "radio",
} as RadioProps;

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: "Radio label",
  value: "1",
  name: "radio",
  tooltip: "Testing a tooltip",
} as RadioProps;

export const WithError = Template.bind({});
WithError.args = {
  label: "Radio label",
  value: "1",
  name: "radio",
  error: "This field is required",
} as RadioProps;

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Radio label",
  value: "1",
  name: "radio",
  disabled: true,
} as RadioProps;

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: "Radio label",
  value: "1",
  name: "radio",
  disabled: true,
} as RadioProps;
