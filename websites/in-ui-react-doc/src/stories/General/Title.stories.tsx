import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Title, HeadingKind } from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Title",
  component: Title,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    kind: {
      control: "select",
      options: [
        "display",
        "sub-display",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle-1",
        "subtitle-2",
      ],
    },
  },
} as ComponentMeta<typeof Title>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Title> = (args) => (
  <Title {...args}>Lorem Ipsum</Title>
);

export const Default = Template.bind({});
Default.args = {
  kind: "display",
} as HeadingKind;
