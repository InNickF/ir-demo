import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Empty,
  EmptyProps,
  Button,
} from "../../../../../packages/in-ui-react/src/lib";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Empty",
  component: Empty,
} as ComponentMeta<typeof Empty>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Empty> = (args) => <Empty {...args} />;

const WithChildrenTemplate: ComponentStory<typeof Empty> = (args) => (
  <Empty {...args}>
    <Button className="mt-4">Action</Button>
  </Empty>
);

export const Default = Template.bind({});
Default.args = {} as EmptyProps;

export const OnlyText = Template.bind({});
OnlyText.args = {
  onlyText: true,
} as EmptyProps;

export const WithCustomDescription = Template.bind({});
WithCustomDescription.args = {
  description: <h4>Custom description</h4>,
} as EmptyProps;

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  icon: <ArchiveBoxXMarkIcon />,
} as EmptyProps;

export const WithChildren = WithChildrenTemplate.bind({});
WithChildren.args = {} as EmptyProps;
