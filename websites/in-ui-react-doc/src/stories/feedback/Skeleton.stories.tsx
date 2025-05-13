import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Skeleton,
  SkeletonProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Skeleton",
  component: Skeleton,
  subcomponents: {
    "Skeleton.Avatar": Skeleton.Avatar,
    "Skeleton.Text": Skeleton.Text,
  },
} as ComponentMeta<typeof Skeleton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args}>
    <div>
      <div>
        <Skeleton.Avatar size="big" />
        <Skeleton.Avatar />
        <Skeleton.Avatar size="small" />
      </div>
      <div>
        <Skeleton.Avatar className="mr-3" size="big" shape="squared" />
        <Skeleton.Avatar className="mr-3" shape="squared" />
        <Skeleton.Avatar size="small" shape="squared" />
      </div>
    </div>
    <Skeleton.Text kind="title" />
    <Skeleton.Text kind="subtitle" />
    <Skeleton.Text rows={3} lastHalf />
  </Skeleton>
);

export const Default = Template.bind({});
Default.args = {} as SkeletonProps;

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
} as SkeletonProps;
