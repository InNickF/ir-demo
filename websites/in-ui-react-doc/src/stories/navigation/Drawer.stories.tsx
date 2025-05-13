import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Drawer,
  DrawerComponentGroup,
  Heading,
  Button,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Drawer",
  component: Drawer,
  subcomponents: {
    "Drawer.Header": Drawer.Header,
  },
} as ComponentMeta<DrawerComponentGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Drawer> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const showDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Drawer {...args} isOpen={isOpen} close={closeDrawer}>
        <Heading kind="h3">H3 Display</Heading>
        <Heading kind="h5">H5 Display</Heading>
        <Heading kind="h6">H6 Display</Heading>
        <Heading kind="subtitle-1">H5 Subtitle 1</Heading>
        <Heading kind="subtitle-2">H6 Subtitle</Heading>
      </Drawer>
      <Button onClick={showDrawer}>Show Drawer</Button>
    </>
  );
};

const Header = <Drawer.Header title="Lorem ipsum" />;

export const Default = Template.bind({});
Default.args = {
  header: Header,
};

export const Left = Template.bind({});
Left.args = {
  header: Header,
  placement: "left",
};
export const Top = Template.bind({});
Top.args = {
  header: Header,
  placement: "top",
};
export const Bottom = Template.bind({});
Bottom.args = {
  header: Header,
  placement: "bottom",
};
export const Fullscreen = Template.bind({});
Fullscreen.args = {
  header: Header,
  fullscreen: true,
};

export const WithoutHeader = Template.bind({});
WithoutHeader.args = {};

export const NotCloseOverlay = Template.bind({});
NotCloseOverlay.args = {
  closeWithOverlay: false,
  header: Header,
};
