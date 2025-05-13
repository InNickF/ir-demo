import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import { UploadInput } from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/UploadInput",
  component: UploadInput,
} as ComponentMeta<typeof UploadInput>;

const Template: ComponentStoryFn<typeof UploadInput> = (args) => (
  <UploadInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Single file",
};

export const Multiple = Template.bind({});
Multiple.args = {
  label: "Multiple files",
  multiple: true,
};

export const JustPDF = Template.bind({});
JustPDF.args = {
  label: "Upload just PDF",
  accept: ".pdf",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Upload a file",
  error: "File is not supported",
};
