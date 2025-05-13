import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Notification,
  NotificationContainerProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Notification.Container",
  component: Notification.Container,
} as ComponentMeta<typeof Notification.Container>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Notification.Container> = (args) => (
  <Notification.Container {...args}>
    <Notification.Item
      kind="info"
      subject={"Lorem ipsum"}
      message={"Lorem ipsum lorem ipsum"}
      onClose={() => console.log("close info")}
    />
    <Notification.Item
      kind="warning"
      subject={"Lorem ipsum"}
      message={"Lorem ipsum lorem ipsum"}
      onClose={() => console.log("close warning")}
    />
    <Notification.Item
      kind="success"
      subject={"Lorem ipsum"}
      message={"Lorem ipsum lorem ipsum"}
      onClose={() => console.log("close success")}
    />
    <Notification.Item
      kind="error"
      subject={"Lorem ipsum"}
      message={"Lorem ipsum lorem ipsum"}
      onClose={() => console.log("close error")}
    />
  </Notification.Container>
);

export const TopRight = Template.bind({});
TopRight.args = {
  position: "top-right",
} as NotificationContainerProps;

export const TopLeft = Template.bind({});
TopLeft.args = {
  position: "top-left",
} as NotificationContainerProps;

export const TopCenter = Template.bind({});
TopCenter.args = {
  position: "top-center",
} as NotificationContainerProps;

export const BottomRight = Template.bind({});
BottomRight.args = {
  position: "bottom-right",
} as NotificationContainerProps;

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  position: "bottom-left",
} as NotificationContainerProps;

export const BottomCenter = Template.bind({});
BottomCenter.args = {
  position: "bottom-center",
} as NotificationContainerProps;
