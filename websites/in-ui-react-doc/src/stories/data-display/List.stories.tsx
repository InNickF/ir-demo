import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  List,
  ListComponentGroup,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/List",
  component: List,
  subcomponents: {
    "List.Head": List.Head,
    "List.Header": List.Header,
    "List.Body": List.Body,
    "List.Row": List.Row,
    "List.Col": List.Data,
  },
} as ComponentMeta<ListComponentGroup>;

const valuesTags: Array<string> = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

const listData = [
  ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
  ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
];
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof List> = (args) => (
  <List {...args}>
    <List.Head>
      {valuesTags?.map((value) => (
        <List.Header key={value}>{value}</List.Header>
      ))}
    </List.Head>
    <List.Body>
      {listData?.map((item, index) => (
        <List.Row key={`${index}-${item.length}`}>
          {item.map((data) => (
            <List.Data key={`${index}-${data}`}>{data}</List.Data>
          ))}
        </List.Row>
      ))}
    </List.Body>
  </List>
);

export const Default = Template.bind({});
Default.args = {};
