import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Heading, HeadingKind } from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Heading",
  component: Heading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    kind: {
      control: "select",
      options: [
        "display",
        "sub-display",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle-1",
        "subtitle-2",
      ],
    },
  },
} as ComponentMeta<typeof Heading>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args}>Hello world</Heading>
);

const MultipleAnimationsTemplate: ComponentStory<typeof Heading> = () => (
  <>
    <Heading kind="display">H1 Display | Playfair Display 6rem</Heading>
    <Heading kind="sub-display">H2 SubDisplay | Montserrat 3rem</Heading>
    <Heading kind="h1">Heading 1 | | Playfair Display 3.75rem</Heading>
    <Heading kind="h2">Heading 2 | Playfair Display 3rem</Heading>
    <Heading kind="h3">Heading 3 | Playfair Display 2.25rem</Heading>
    <Heading kind="h4">Heading 4 | Playfair Display 1.875rem</Heading>
    <Heading kind="h5">Heading 5 | Playfair Display 1.5rem</Heading>
    <Heading kind="h6">Heading 6 | Playfair Display 1rem</Heading>
    <Heading kind="subtitle-1">H5 Subtitle 1 | Montserrat 1.25rem</Heading>
    <Heading kind="subtitle-2">H6 Subtitle 2 | Montserrat 1rem</Heading>
  </>
);

export const Default = Template.bind({});
Default.args = {
  kind: "display",
} as HeadingKind;

export const Multiple = MultipleAnimationsTemplate.bind({});
