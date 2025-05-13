import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Heading,
  PageHeader,
  PageHeaderProps,
  Navbar,
  Logo,
} from "../../../../../packages/in-ui-react/src/lib";
import {
  XCircleIcon,
  PlusCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/PageHeader",
  component: PageHeader,
  subcomponents: {
    "PageHeader.Item": PageHeader.Item,
  },
} as ComponentMeta<typeof PageHeader>;

const scrollDiv = {
  height: "2000px",
  width: "80%",
  margin: "0 auto",
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof PageHeader> = (args) => {
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const PageHeaderMenu = () => {
    return (
      <>
        <PageHeader.Item
          active={active}
          icon={<PlusCircleIcon />}
          onClick={() => setActive(!active)}
        >
          Lorem Ipsum
        </PageHeader.Item>
        <PageHeader.Item icon={<XCircleIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
        <PageHeader.Item icon={<CheckIcon />}>Lorem Ipsum</PageHeader.Item>
      </>
    );
  };

  return (
    <>
      <Navbar paddingX="both">
        <div className="flex items-center w-full h-full">
          <Logo name="ei" theme="Default-light" />
        </div>
      </Navbar>
      <PageHeader
        {...args}
        drawerIsOpen={isOpen}
        closeDrawer={() => {
          setIsOpen(false);
        }}
        openDrawer={() => {
          setIsOpen(true);
        }}
        menu={<PageHeaderMenu />}
      >
        <Heading>Lorem Ipsum</Heading>
      </PageHeader>
      <div style={scrollDiv}></div>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {} as PageHeaderProps;

export const NoFixedHeader = Template.bind({});
NoFixedHeader.args = {
  noFixed: true,
} as PageHeaderProps;
