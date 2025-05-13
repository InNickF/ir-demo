import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dock, DockProps } from "../../../../../packages/in-ui-react/src/lib";
import { FolderIcon, WifiIcon, BeakerIcon } from "@heroicons/react/24/solid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Dock",
  component: Dock,
  subcomponents: {
    "Dock.Item": Dock.Item,
  },
} as ComponentMeta<typeof Dock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dock> = (args) => {
  return (
    <>
      <Dock {...args}>
        <Dock.Item icon={<FolderIcon />} label="Fund">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
              nobis eveniet nostrum accusantium quasi enim omnis! Velit dolore
              illum praesentium. Blanditiis sunt explicabo ducimus. Repellat
              aperiam officia quae maxime reiciendis, quaerat cupiditate
              deserunt iusto est. Ab, tempore omnis maiores natus placeat
              similique aliquid incidunt temporibus officiis, illum, atque
              beatae? Magnam.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
              nobis eveniet nostrum accusantium quasi enim omnis! Velit dolore
              illum praesentium. Blanditiis sunt explicabo ducimus. Repellat
              aperiam officia quae maxime reiciendis, quaerat cupiditate
              deserunt iusto est. Ab, tempore omnis maiores natus placeat
              similique aliquid incidunt temporibus officiis, illum, atque
              beatae? Magnam.
            </p>
          </div>
        </Dock.Item>
        <Dock.Item icon={<WifiIcon />} label="Deals information">
          <div className="w-full max-w-lg">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
              nobis eveniet nostrum accusantium quasi enim omnis! Velit dolore
              illum praesentium. Blanditiis sunt explicabo ducimus. Repellat
              aperiam officia quae maxime reiciendis, quaerat cupiditate
              deserunt iusto est. Ab, tempore omnis maiores natus placeat
              similique aliquid incidunt temporibus officiis, illum, atque
              beatae? Magnam.
            </p>
          </div>
        </Dock.Item>
        <Dock.Item icon={<BeakerIcon />} label="Market analysis" />
      </Dock>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {} as DockProps;

const WithoutContentTemplate: ComponentStory<typeof Dock> = (args) => {
  return (
    <>
      <Dock {...args}>
        <Dock.Item icon={<FolderIcon />} label="Fund" />
        <Dock.Item icon={<WifiIcon />} label="Deals information" />
        <Dock.Item icon={<BeakerIcon />} label="Market analysis" />
      </Dock>
    </>
  );
};

export const WithoutContent = WithoutContentTemplate.bind({});
WithoutContent.args = {} as DockProps;

const WithActiveItemTemplate: ComponentStory<typeof Dock> = (args) => {
  return (
    <>
      <Dock {...args}>
        <Dock.Item active icon={<FolderIcon />} label="Fund" />
        <Dock.Item icon={<WifiIcon />} label="Deals information" />
        <Dock.Item icon={<BeakerIcon />} label="Market analysis" />
      </Dock>
    </>
  );
};

export const WithActiveItem = WithActiveItemTemplate.bind({});
WithActiveItem.args = {} as DockProps;
