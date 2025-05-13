import React from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import {
  UploadButton,
  useUploadButtonState,
  fileToBase64,
} from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/UploadButton",
  component: UploadButton,
} as ComponentMeta<typeof UploadButton>;

const Template: ComponentStoryFn<typeof UploadButton> = (args) => {
  const state = useUploadButtonState();
  return (
    <UploadButton {...args} state={state}>
      Upload file
    </UploadButton>
  );
};

const TemplateBase64: ComponentStoryFn<typeof UploadButton> = (args) => {
  const state = useUploadButtonState();
  React.useEffect(
    () =>
      state.files.forEach((file) =>
        fileToBase64(file).then((data) => console.log(data))
      ),
    [state.files]
  );
  return (
    <UploadButton {...args} state={state}>
      Upload file
    </UploadButton>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const JustPDF = Template.bind({});
JustPDF.args = {
  accept: ".pdf",
};

export const Base64 = TemplateBase64.bind({});
Base64.args = {};
