import React, { useState } from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import {
  Pagination,
  PaginationProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStoryFn<typeof Pagination> = (args) => {
  const [current, setCurrent] = useState(1);
  return (
    <Pagination
      current={current}
      onChangePage={(page) => setCurrent(page)}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  total: 50,
  loading: false,
} as PaginationProps;
