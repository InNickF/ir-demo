import React, { useState } from "react";
import { ComponentStoryFn, ComponentMeta } from "@storybook/react";

import {
  FilterType,
  Filters,
  FiltersPayloadType,
  OptionType,
} from "../../../../../packages/in-ui-react/src/lib";

export default {
  title: "Component/Filters",
  component: Filters,
} as ComponentMeta<typeof Filters>;

const pageFilters: FilterType<OptionType>[] = [
  {
    name: "fund",
    key: "fund",
    type: "simple-select",
    options: [
      { label: "v", value: "f2964a3a-a25d-4fe9-88df-e1cb778e710f" },
      {
        label: "Industrial Fund Example",
        value: "1ab94ef9-0d38-4ba4-8e55-71a0af5b7911",
      },
      {
        label: "Industrial Fund Example",
        value: "9ba3b9ce-c5f3-485c-a953-e879770093e9",
      },
      {
        label: " Development Partners",
        value: "1a750860-f8fb-4836-851b-e0f756b51618",
      },
    ],
  },
  {
    name: "status",
    key: "status",
    type: "simple-select",
    options: [
      { label: "PRE-SCREENING", value: "PRE-SCREENING" },
      { label: "APPROVED", value: "APPROVED" },
      { label: "PENDING IC", value: "PENDING IC" },
    ],
  },
  {
    name: "phase",
    key: "phase",
    type: "simple-select",
    options: [
      { label: "SCREENING", value: "SCREENING" },
      { label: "LOI", value: "LOI" },
      { label: "PSA", value: "PSA" },
      { label: "DD", value: "DD" },
      { label: "CLOSING", value: "CLOSING" },
      { label: "CLOSED", value: "CLOSED" },
      { label: "DEAD", value: "DEAD" },
    ],
  },
  {
    name: "market",
    key: "market",
    type: "simple-select",
    options: [
      { label: "Northern New Jersey", value: "northern_new_jersey" },
      { label: "New York Metro", value: "new_york_metro" },
      { label: "LA", value: "la" },
      { label: "Inland Empire", value: "inland_empire" },
      { label: "East Bay", value: "east_bay" },
      { label: "Carlsbad/San Diego", value: "carlsbad/san_diego" },
      { label: "Seattle", value: "seattle" },
      { label: "Miami", value: "miami" },
      { label: "Fort Lauderdale", value: "fort_lauderdale" },
      { label: "DC Metro", value: "dc_metro" },
    ],
  },
  {
    name: "officer",
    key: "officer",
    type: "multi-select",
    options: [
      {
        label: "Test Officer 1",
        value: "ff66e491-33a5-49b4-a573-9068fa1d56c7",
      },
      { label: "Greg Skaler", value: "ede129e7-a84f-4449-a2a4-944e3a49bdb9" },
      { label: "Jhon Mosley", value: "c5919501-8de0-42d5-86f0-a370c96c3b7b" },
      {
        label: "James Lambert",
        value: "b31c80ea-d1be-42b0-963a-59d2fbd59105",
      },
    ],
  },
  {
    name: "analyst",
    key: "analyst",
    type: "multi-select",
    options: [
      {
        label: "Test Analyst 1",
        value: "715c85fc-440c-47a4-919c-0f340f641f16",
      },
      {
        label: "Josh Sabbagh",
        value: "aeab01a9-29ec-48af-8083-8fb453dd1741",
      },
      { label: "Zach Gerry", value: "467957d7-ad1f-49d4-9804-6badd72460d1" },
    ],
  },
  {
    name: "Search",
    key: "search",
    type: "text",
  },
];

const DefaultTemplate: ComponentStoryFn<typeof Filters> = (args) => {
  const [filteredOptions, setFilteredOptions] = useState<FiltersPayloadType>(
    {}
  );
  return (
    <Filters
      {...args}
      filters={pageFilters}
      filteredOptions={filteredOptions}
      onApply={(filter) => setFilteredOptions({ ...filter })}
    />
  );
};

const SimpleSelects: ComponentStoryFn<typeof Filters> = (args) => {
  const onlySimpleSelects = pageFilters.filter(
    (filter) => filter.type === "simple-select"
  );

  const [filteredOptions, setFilteredOptions] = useState<FiltersPayloadType>(
    {}
  );
  return (
    <Filters
      {...args}
      filters={onlySimpleSelects}
      filteredOptions={filteredOptions}
      onApply={(filter) => setFilteredOptions({ ...filter })}
    />
  );
};

const MultiSelects: ComponentStoryFn<typeof Filters> = (args) => {
  const onlySimpleSelects = pageFilters.filter(
    (filter) => filter.type === "multi-select"
  );

  const [filteredOptions, setFilteredOptions] = useState<FiltersPayloadType>(
    {}
  );
  return (
    <Filters
      {...args}
      filters={onlySimpleSelects}
      filteredOptions={filteredOptions}
      onApply={(filter) => setFilteredOptions({ ...filter })}
    />
  );
};

const TextInput: ComponentStoryFn<typeof Filters> = (args) => {
  const onlyTextInputs = pageFilters.filter((filter) => filter.type === "text");

  const [filteredOptions, setFilteredOptions] = useState<FiltersPayloadType>(
    {}
  );
  return (
    <Filters
      {...args}
      filters={onlyTextInputs}
      filteredOptions={filteredOptions}
      onApply={(filter) => setFilteredOptions({ ...filter })}
    />
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const OnlySimpleSelects = SimpleSelects.bind({});
OnlySimpleSelects.args = {};

export const OnlyMultiSelects = MultiSelects.bind({});
OnlyMultiSelects.args = {};

export const OnlyTextInput = TextInput.bind({});
OnlyTextInput.args = {};
