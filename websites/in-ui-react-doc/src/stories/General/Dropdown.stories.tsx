import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import {
  Dropdown,
  DropdownProps,
  Button,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <>
      <Dropdown
        {...args}
        disclosure={<Button onlyIcon icon={<EllipsisHorizontalIcon />} />}
        items={[
          {
            text: "Add",
            onClick: () => console.log("Add"),
          },
          {
            text: "Edit",
            onClick: () => console.log("Edit"),
          },
          {
            text: "Delete",
            onClick: () => console.log("Delete"),
          },
        ]}
      />
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {} as DropdownProps;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WithIconsTemplate: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <>
      <Dropdown
        {...args}
        disclosure={
          <Button onlyIcon kind="ghost" icon={<EllipsisHorizontalIcon />} />
        }
        items={[
          {
            text: "Add",
            icon: <PlusIcon />,
            onClick: () => console.log("Add"),
          },
          {
            text: "Edit",
            icon: <PlusIcon />,
            onClick: () => console.log("Edit"),
          },
          {
            text: "Delete",
            icon: <PlusIcon />,
            onClick: () => console.log("Delete"),
          },
        ]}
      />
    </>
  );
};

export const WithIcons = WithIconsTemplate.bind({});
WithIcons.args = {} as DropdownProps;
