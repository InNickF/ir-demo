import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Loader, LoaderProps } from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Loader",
  component: Loader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Loader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

const MultipleAnimationsTemplate: ComponentStory<typeof Loader> = ({
  color,
  role,
  size,
  velocity,
  "aria-busy": ariaBusy,
  className,
  title,
  ...args
}) => (
  <>
    <Loader
      style={{
        marginBottom: "10px",
      }}
      color={color}
      className={className}
      size={size}
      velocity={velocity}
      animation="default"
      role={role}
      aria-busy={ariaBusy}
      title={title}
      {...args}
    />
    <Loader
      style={{
        marginBottom: "10px",
      }}
      color={color}
      className={className}
      size={size}
      velocity={velocity}
      animation="ease"
      role={role}
      aria-busy={ariaBusy}
      title={title}
      {...args}
    />
    <Loader
      style={{
        marginBottom: "10px",
      }}
      color={color}
      className={className}
      size={size}
      velocity={velocity}
      animation="ease-in-out"
      role={role}
      aria-busy={ariaBusy}
      title={title}
      {...args}
    />
    <Loader
      style={{
        marginBottom: "10px",
      }}
      color={color}
      className={className}
      size={size}
      velocity={velocity}
      animation="lineal"
      role={role}
      aria-busy={ariaBusy}
      title={title}
      {...args}
    />
  </>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  role: "alert",
  size: "normal",
  velocity: "default",
  animation: "default",
  "aria-busy": true,
  className: "",
  title: "Loading animation",
} as LoaderProps;

export const Multiple = MultipleAnimationsTemplate.bind({});
Multiple.args = {
  ...Default.args,
} as LoaderProps;
