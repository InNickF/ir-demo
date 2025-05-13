import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PlusIcon } from "@heroicons/react/24/outline";

import {
  ButtonGroup,
  ButtonGroupProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/ButtonGroup",
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof ButtonGroup> = (args) => {
  return (
    <>
      <ButtonGroup
        {...args}
        items={[
          {
            key: "all",
            text: "All",
            onClick: (key) => console.log(key),
          },
          {
            key: "lease",
            text: "Lease comps",
            onClick: (key) => console.log(key),
          },
          {
            key: "sale",
            text: "Sale comps",
            onClick: (key) => console.log(key),
          },
        ]}
      />
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {} as ButtonGroupProps;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WithIconsTemplate: ComponentStory<typeof ButtonGroup> = (args) => {
  return (
    <>
      <ButtonGroup
        {...args}
        items={[
          {
            key: "all",
            text: "All",
            icon: <PlusIcon />,
            onClick: (key) => console.log(key),
          },
          {
            key: "lease",
            text: "Lease comps",
            icon: <PlusIcon />,
            onClick: (key) => console.log(key),
          },
          {
            key: "sale",
            text: "Sale comps",
            icon: <PlusIcon />,
            onClick: (key) => console.log(key),
          },
        ]}
      />
    </>
  );
};

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {} as ButtonGroupProps;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WithActiveTemplate: ComponentStory<typeof ButtonGroup> = (args) => {
  return (
    <>
      <ButtonGroup
        {...args}
        items={[
          {
            key: "all",
            text: "All",
            onClick: () => console.log("all"),
          },
          {
            key: "lease",
            text: "Lease comps",
            onClick: () => console.log("lease"),
          },
          {
            key: "sale",
            text: "Sale comps",
            onClick: () => console.log("sale"),
          },
        ]}
      />
    </>
  );
};

export const WithActive = WithActiveTemplate.bind({});
WithActive.args = {
  active: "lease",
} as ButtonGroupProps;
