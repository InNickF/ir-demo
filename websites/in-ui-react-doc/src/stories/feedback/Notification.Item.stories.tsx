import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Notification,
  NotificationItemProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Notification.Item",
  component: Notification.Item,
} as ComponentMeta<typeof Notification.Item>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Notification.Item> = (args) => (
  <Notification.Item {...args} />
);

export const Success = Template.bind({});
Success.args = {
  className: "w-96",
  kind: "success",
  subject: "Success title example",
  message: "Lorem ipsum lorem ipsum",
  onClose: () => console.log("close"),
} as NotificationItemProps;

export const Info = Template.bind({});
Info.args = {
  className: "w-96",
  kind: "info",
  subject: "Info title example",
  message: "Lorem ipsum lorem ipsum",
  onClose: () => console.log("close"),
} as NotificationItemProps;

export const Warning = Template.bind({});
Warning.args = {
  className: "w-96",
  kind: "warning",
  subject: "Info title example",
  message: "Lorem ipsum lorem ipsum",
  onClose: () => console.log("close"),
} as NotificationItemProps;

export const Error = Template.bind({});
Error.args = {
  className: "w-96",
  kind: "error",
  subject: "Error title example",
  message: "Lorem ipsum lorem ipsum",
  onClose: () => console.log("close"),
} as NotificationItemProps;

export const WithoutMessage = Template.bind({});
WithoutMessage.args = {
  className: "w-96",
  kind: "success",
  subject: "Success title example",
  onClose: () => console.log("close"),
} as NotificationItemProps;
