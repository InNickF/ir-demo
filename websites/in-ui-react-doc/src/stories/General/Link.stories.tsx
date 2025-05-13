import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  AsElement,
  Link,
  LinkProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Link",
  component: Link,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    target: {
      control: "select",
      options: ["_blank", "_self", "_parent", "_top", "framename"],
    },
  },
} as ComponentMeta<typeof Link>;

type LinkComponent = <C extends AsElement>(
  props: LinkProps<C>
) => React.ReactElement | null;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Link> = (args) => (
  <Link {...args}>Hello world</Link>
);

export const Default = Template.bind({});
Default.args = {} as LinkComponent;
