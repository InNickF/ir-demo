import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
  Card,
  Table,
  TableProps,
} from "../../../../../packages/in-ui-react/src/lib";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Table",
  component: Table,
  subcomponents: {
    "Table.Head": Table.Head,
    "Table.Header": Table.Header,
    "Table.Row": Table.Row,
    "Table.Body": Table.Body,
    "Table.Data": Table.Data,
    "Table.Foot": Table.Foot,
    "Table.Pagination": Table.Pagination,
  },
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TableWithPagination: ComponentStory<typeof Table> = (args) => {
  const [page, setPage] = useState(1);
  return (
    <Card>
      <Table {...args}>
        <Table.Head>
          <Table.Header>Firstname</Table.Header>
          <Table.Header>Lastname</Table.Header>
          <Table.Header>Age</Table.Header>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>Priya</Table.Data>
            <Table.Data>Sharma</Table.Data>
            <Table.Data>24</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Arun</Table.Data>
            <Table.Data>Singh</Table.Data>
            <Table.Data>32</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Sam</Table.Data>
            <Table.Data>Watson</Table.Data>
            <Table.Data>41</Table.Data>
          </Table.Row>
          <Table.Foot>
            <Table.Row></Table.Row>
          </Table.Foot>
        </Table.Body>
      </Table>
      <Table.Pagination
        total={10}
        current={page}
        onChangePage={(page) => setPage(page)}
      />
    </Card>
  );
};

export const WithPagination = TableWithPagination.bind({});
WithPagination.args = {} as TableProps;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TableDefault: ComponentStory<typeof Table> = (args) => {
  return (
    <>
      <Table {...args}>
        <Table.Head>
          <Table.Header>Firstname</Table.Header>
          <Table.Header>Lastname</Table.Header>
          <Table.Header>Age</Table.Header>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>Priya</Table.Data>
            <Table.Data>Sharma</Table.Data>
            <Table.Data>24</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Arun</Table.Data>
            <Table.Data>Singh</Table.Data>
            <Table.Data>32</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Sam</Table.Data>
            <Table.Data>Watson</Table.Data>
            <Table.Data>41</Table.Data>
          </Table.Row>
          <Table.Foot>
            <Table.Row></Table.Row>
          </Table.Foot>
        </Table.Body>
      </Table>
    </>
  );
};

export const Default = TableDefault.bind({});
Default.args = {} as TableProps;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TableWithSorting: ComponentStory<typeof Table> = (args) => {
  const [sorting, setSorting] = useState("");

  return (
    <Card>
      <Table {...args}>
        <Table.Head>
          <Table.Header
            sorting={sorting}
            sortingKey="firtname"
            onSorting={(sort) => setSorting(sort)}
          >
            Firstname
          </Table.Header>
          <Table.Header
            sorting={sorting}
            sortingKey="lastname"
            onSorting={(sort) => setSorting(sort)}
          >
            Lastname
          </Table.Header>
          <Table.Header
            sorting={sorting}
            sortingKey="age"
            onSorting={(sort) => setSorting(sort)}
          >
            Age
          </Table.Header>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>Priya</Table.Data>
            <Table.Data>Sharma</Table.Data>
            <Table.Data>24</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Arun</Table.Data>
            <Table.Data>Singh</Table.Data>
            <Table.Data>32</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Sam</Table.Data>
            <Table.Data>Watson</Table.Data>
            <Table.Data>41</Table.Data>
          </Table.Row>
          <Table.Foot>
            <Table.Row></Table.Row>
          </Table.Foot>
        </Table.Body>
      </Table>
    </Card>
  );
};

export const WithSorting = TableWithSorting.bind({});
WithSorting.args = {} as TableProps;
