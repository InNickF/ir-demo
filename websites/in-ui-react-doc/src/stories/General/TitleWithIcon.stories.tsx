import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  TitleWithIcon,
  TitleWithIconProps,
} from "../../../../../packages/in-ui-react/src/lib";
import { CheckIcon } from "@heroicons/react/24/outline";

export default {
  title: "Component/TitleWithIcon",
  component: TitleWithIcon,
} as ComponentMeta<typeof TitleWithIcon>;

const Template: ComponentStory<typeof TitleWithIcon> = (args) => (
  <TitleWithIcon {...args} icon={<CheckIcon />}>
    Testing card title
  </TitleWithIcon>
);
export const Default = Template.bind({});
Default.args = {} as TitleWithIconProps;
