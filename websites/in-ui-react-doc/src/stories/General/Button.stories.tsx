import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import {
  AsElement,
  Button,
  ButtonProps,
} from "../../../../../packages/in-ui-react/src/lib";
import { PlusIcon } from "@heroicons/react/24/outline";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    renderElement: {
      control: "select",
      options: ["button", "a"],
    },
    onClick: { action: "onClick", table: { disable: true } },
  },
} as ComponentMeta<typeof Button>;

type ButtonComponent = <C extends AsElement>(
  props: ButtonProps<C>
) => React.ReactElement | null;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStoryFn<typeof Button> = (args) => (
  <Button {...args}>Hi</Button>
);

const MultipleTemplate: ComponentStoryFn<typeof Button> = ({
  color,
  kind,
  renderElement,
  size,
  iconPosition,
  loading,
  onlyIcon,
  block,
  onClick,
  icon,
  ...args
}) => (
  <>
    <Button
      style={{
        marginRight: "10px",
      }}
      color={color}
      kind={kind}
      renderElement={renderElement}
      size={size}
      iconPosition={iconPosition}
      loading={loading}
      onlyIcon={onlyIcon}
      block={block}
      onClick={onClick}
      icon={icon}
      {...args}
    >
      Hello Word
    </Button>
    <Button
      style={{
        marginRight: "10px",
      }}
      color={color}
      kind="outline"
      renderElement={renderElement}
      size={size}
      iconPosition={iconPosition}
      loading={loading}
      block={block}
      onClick={onClick}
      icon={icon}
      {...args}
    >
      Hello Word
    </Button>
    <Button
      style={{
        marginRight: "10px",
      }}
      color={color}
      kind="ghost"
      renderElement={renderElement}
      size={size}
      iconPosition={iconPosition}
      loading={loading}
      block={block}
      onClick={onClick}
      icon={icon}
      {...args}
    >
      Hello Word
    </Button>
  </>
);

export const Default = Template.bind({});
Default.args = {
  as: "button",
  kind: "decorated",
  shape: "default",
  size: "normal",
  iconPosition: "left",
  loading: false,
  onlyIcon: false,
  block: false,
} as unknown as ButtonComponent;

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: <PlusIcon />,
} as unknown as ButtonComponent;

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
} as unknown as ButtonComponent;

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
} as unknown as ButtonComponent;

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  ...Default.args,
} as ButtonComponent;
